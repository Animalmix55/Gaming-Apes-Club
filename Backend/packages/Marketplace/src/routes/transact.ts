import express from 'express';
import {
    BaseResponse,
    createJWT,
    generateLoginMessage,
    getClient,
    getGamingApeClubContract,
    verifyJWT,
    verifySignature,
} from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { getBalance, getUNBClient, give, spend } from '@gac/token';
import Web3 from 'web3';
import { Intents } from 'discord.js';
import { v4 } from 'uuid';
import StoredTransaction from '../database/models/StoredTransaction';
import Transaction from '../models/Transaction';
import { getListingWithCount } from '../utils/ListingUtils';
import {
    applyRole,
    getGuildMember,
    sendTransactionMessage,
} from '../utils/Discord';

interface TransactionJWTPayload {
    user: string;
    signableMessage: string;
}

interface PostResponse extends BaseResponse, Partial<Transaction> {
    newBalance?: number;
    signableMessage?: string;
    signableMessageToken?: string;
}

interface PostRequest {
    listingId: string;
    quantity: number;
    /**
     * Optional message and signature data for listings requiring it
     */
    signableMessageToken?: string;
    signature?: string;
    /**
     * Not necessarily the address that signs the message...
     * Just the address that the user wishes to have recorded into the
     * transaction for whitelist spots or what have you.
     */
    address?: string;
}

interface GetRequest {
    offset?: string;
    pageSize?: string;
}

interface GetResponse extends BaseResponse {
    results?: Transaction[];
    numRecords?: number;
}

export const getTransactionRouter = async (
    unbToken: string,
    guildId: string,
    jwtPrivate: string,
    web3: Web3,
    gamingApeClubAddress: string,
    discordBotToken: string,
    discordTransactionChannelId: string
) => {
    const TransactionRouter = express.Router();

    const discordClient = await getClient(discordBotToken, [
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
    ]);

    // GET

    interface UserParams {
        userId: string;
    }

    TransactionRouter.get<
        string,
        UserParams,
        GetResponse,
        never,
        GetRequest,
        AuthLocals
    >('/user/:userId', async (req, res) => {
        const { query, params } = req;
        const { locals } = res;
        const { isAdmin, user } = locals;
        const { offset: offsetStr, pageSize: pageSizeStr } = query;
        const { userId } = params;

        if (userId !== user.id && !isAdmin)
            return res
                .status(403)
                .send({ error: 'You cannot access records for another user' });

        const offset = Number(offsetStr || 0);
        const limit = Number(pageSizeStr || 1000);

        const { count, rows } = await StoredTransaction.findAndCountAll({
            offset,
            limit,
            where: {
                user: userId,
            },
        });

        return res
            .status(200)
            .send({ results: rows.map((r) => r.get()), numRecords: count });
    });

    interface ListingParams {
        listingId: string;
    }

    interface FulfillmentParams {
        transactionId: string;
    }

    TransactionRouter.get<
        string,
        ListingParams,
        GetResponse,
        never,
        GetRequest,
        AuthLocals
    >('/listing/:listingId', async (req, res) => {
        const { query, params } = req;
        const { locals } = res;
        const { isAdmin } = locals;
        const { offset: offsetStr, pageSize: pageSizeStr } = query;
        const { listingId } = params;

        if (!isAdmin)
            return res
                .status(403)
                .send({ error: 'You cannot access records by listing id' });

        const offset = Number(offsetStr || 0);
        const limit = Number(pageSizeStr || 1000);

        const { count, rows } = await StoredTransaction.findAndCountAll({
            offset,
            limit,
            where: {
                listingId,
            },
        });

        return res
            .status(200)
            .send({ results: rows.map((r) => r.get()), numRecords: count });
    });

    TransactionRouter.get<
        string,
        never,
        GetResponse,
        never,
        GetRequest,
        AuthLocals
    >('/', async (req, res) => {
        const { query } = req;
        const { locals } = res;
        const { isAdmin } = locals;
        const { offset: offsetStr, pageSize: pageSizeStr } = query;

        if (!isAdmin)
            return res
                .status(403)
                .send({ error: 'You cannot access unfiltered records' });

        const offset = Number(offsetStr || 0);
        const limit = Number(pageSizeStr || 1000);

        const { count, rows } = await StoredTransaction.findAndCountAll({
            offset,
            limit,
        });

        return res
            .status(200)
            .send({ results: rows.map((r) => r.get()), numRecords: count });
    });

    // POST

    TransactionRouter.post<
        string,
        never,
        PostResponse,
        PostRequest,
        never,
        AuthLocals
    >('/', async (req, res) => {
        const { body } = req;
        const { user, isAdmin } = res.locals;

        if (!user)
            return res.status(401).send({ error: 'No authorization provided' });

        const {
            listingId,
            quantity,
            signature,
            signableMessageToken,
            address: recordableAddress,
        } = body;
        const { id } = user;
        console.log(
            `Processing a transaction for ${id} to purchase ${quantity} of listingId ${listingId}`
        );

        const listing = await getListingWithCount(listingId);
        if (!listing) {
            console.log(
                `${id} requested a transaction on non-existant listing ${listingId}`
            );
            return res.status(404).send({ error: 'Listing not found' });
        }

        const previousTransactions = await StoredTransaction.findAll({
            where: {
                listingId,
                user: id,
            },
        });

        const quantityAlreadyPurchased = previousTransactions.reduce(
            (prev, cur) => prev + cur.get().quantity,
            0
        );

        let address: string | undefined;
        const {
            maxPerUser,
            price,
            requiresHoldership,
            requiresLinkedAddress,
            disabled,
            supply,
            totalPurchased,
            roles: allowedRoles,
            resultantRole,
        } = listing;

        if (disabled) {
            console.log(
                `${id} requested a transaction on disabled listing ${listing.title} (${listingId})`
            );
            return res.status(403).send({ error: 'Listing is disabled' });
        }

        // always fetch the newest role
        if (allowedRoles.length > 0) {
            const allowedRoleIds = allowedRoles.map((r) => r.roleId);
            try {
                const guildMember = await getGuildMember(
                    discordClient,
                    id,
                    guildId
                );

                const roles = guildMember.roles.cache;

                if (!roles.some((r) => allowedRoleIds.includes(r.id))) {
                    console.log(
                        `${id} requested a transaction for listing ${
                            listing.title
                        } (${listingId}) but they lacked the required roles (${allowedRoleIds.join(
                            ', '
                        )})`
                    );
                    return res
                        .status(403)
                        .send({ error: 'Required role missing' });
                }
            } catch (e) {
                console.error(`Failed to fetch user role for ${id}`, e);
                return res
                    .status(500)
                    .send({ error: 'Could not fetch user roles' });
            }
        }

        if (requiresHoldership) {
            if (!signature || !signableMessageToken) {
                const signableMessage = generateLoginMessage();
                const payload: TransactionJWTPayload = {
                    user: id,
                    signableMessage,
                };
                const jwt = createJWT(payload, jwtPrivate, '3m'); // token lasts 3 minutes
                console.log(
                    `A signature is needed for ${id} to purchase ${listing.title} (${listingId})`
                );
                return res.status(449).send({
                    error: 'Requires signature',
                    signableMessage,
                    signableMessageToken: jwt,
                }); // retry with auth
            }

            try {
                const { user: jwtUser, signableMessage } =
                    verifyJWT<TransactionJWTPayload>(
                        signableMessageToken,
                        jwtPrivate
                    );

                if (jwtUser !== id)
                    throw new Error('Token not issued to active user');

                address = verifySignature(signature, signableMessage, web3);
            } catch (e) {
                console.log(
                    `User ${id} used an invalid message token to try to purchase ${listing.title} (${listingId})`
                );
                return res.status(403).send({
                    error: String(e),
                });
            }

            const contract = getGamingApeClubContract(
                gamingApeClubAddress,
                web3
            );

            try {
                const numberHeld = await contract.methods
                    .balanceOf(address)
                    .call();
                if (numberHeld === '0') {
                    console.log(
                        `${id} does not hold the proper tokens to purchase ${listing.title} (${listingId})`
                    );
                    return res.status(403).send({
                        error: 'You must be a token holder to transact.',
                    });
                }
            } catch (e) {
                console.error(
                    `Failed to communicate with blockchain for transaction spooled by user ${id} to purchase ${listing.title} (${listingId})`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to communicate with blockchain' });
            }
        }

        if (
            maxPerUser !== null &&
            quantity + quantityAlreadyPurchased > maxPerUser
        ) {
            console.log(
                `${id} tried to purchase ${listing.title} (${listingId}) but they already maxxed out per user (max: ${maxPerUser}, purchased: ${quantityAlreadyPurchased}, desired: ${quantity}).`
            );
            return res.status(400).send({ error: 'Exceeds allowed quantity' });
        }

        if (supply !== null && quantity + totalPurchased > supply) {
            console.log(
                `${id} tried to purchase ${
                    listing.title
                } (${listingId}) but it was sold out (quantity desired: ${quantity}, quantity remaining ${
                    supply - totalPurchased
                })`
            );
            return res.status(400).send({ error: 'Exceeds available supply' });
        }

        if (
            requiresLinkedAddress &&
            (!recordableAddress || !Web3.utils.isAddress(recordableAddress))
        ) {
            console.log(
                `User ${id} provided an invalid linked address ${recordableAddress} to purchase ${listing.title} (${listingId})`
            );
            return res.status(500).send({ error: 'Invalid linked address' });
        }

        const client = getUNBClient(unbToken);
        const { total: balance } = await getBalance(client, guildId, id);

        // free for admin
        if (!isAdmin) {
            if (balance < quantity * price) {
                console.log(
                    `${id} has an insufficient balance of ${balance} to purchase ${quantity} of ${listing.title} (${listingId})`
                );
                return res.status(400).send({
                    error: `Unsufficient balance, you have a balance of ${balance}`,
                });
            }

            try {
                console.log(
                    `Reaching out to UNB to spend ${
                        quantity * price
                    } GACXP for user ${id} to purchase ${quantity} of ${
                        listing.title
                    } (${listingId})`
                );
                // spend tokens
                await spend(client, guildId, id, quantity * price);
                console.log(
                    `Deducted ${quantity * price} GACXP from user ${id} for ${
                        listing.title
                    } (${listingId})`
                );
            } catch (e) {
                console.error(
                    `Failed to spend UNB tokens for user ${id} ${quantity} ${listing.title} (${listingId})`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to spend tokens' });
            }
        }

        if (resultantRole) {
            console.log(
                `Attempting to give ${id} the role ${resultantRole} for purchasing ${listing.title} (${listingId})`
            );
            applyRole(discordClient, id, guildId, resultantRole)
                .then(() =>
                    console.log(
                        `Gave user ${id} the role ${resultantRole} for purchasing ${listing.title} (${listingId})`
                    )
                )
                .catch((e) => {
                    console.error(
                        `Failed to give user ${id} the role ${resultantRole} for purchasing ${listing.title} (${listingId})`,
                        e
                    );
                });
        }

        // generate transaction
        console.log(
            `Generating transaction for user ${id} purchasing ${listing.title} (${listingId})`
        );

        const localTx = {
            listingId,
            user: id,
            quantity,
            address: requiresLinkedAddress ? recordableAddress : address,
        } as Transaction;

        let tx: StoredTransaction;
        try {
            tx = await StoredTransaction.create(localTx);
            console.log(
                `Generated transaction for user ${id} purchasing ${
                    listing.title
                } (${listingId}) with id ${tx.get().id}`
            );
        } catch (e) {
            const errorId = v4();

            console.error(
                `Failed to save the following transaction for ${id} to purchase ${quantity} of ${listing.title} (${listingId}), error id: ${errorId}`,
                localTx,
                e
            );

            console.log(
                `Attempting to give back ${
                    quantity * price
                } GACXP to user ${id} for failed transaction to purchase ${
                    listing.title
                } (${listingId})`
            );
            let tokensReturned = false;
            try {
                await give(client, guildId, id, quantity * price);
                tokensReturned = true;
            } catch (e) {
                console.error(
                    `[DEV INTERVENTION NEEDED] failed to return ${
                        quantity * price
                    } GACXP back to ${id} for their failed purchase of ${
                        listing.title
                    } (${listingId}), errorId: ${errorId}`,
                    e
                );
            }

            return res.status(500).send({
                error: `Transaction failed, ${
                    tokensReturned
                        ? 'your tokens were returned.'
                        : 'we could not return your tokens, contact support.'
                }. Error id: ${errorId}`,
            });
        }

        console.log(
            `Attempting to send message to discord channel for successful transaction ${tx.getDataValue(
                'id'
            )}`
        );
        sendTransactionMessage(
            discordClient,
            discordTransactionChannelId,
            user,
            listing
        )
            .then((m) =>
                console.log(
                    `Successfully published transaction message for tx ${tx.getDataValue(
                        'id'
                    )}: ${m}`
                )
            )
            .catch((e) =>
                console.error(
                    `Failed to post transaction message for tx ${tx.getDataValue(
                        'id'
                    )}: ${e}`
                )
            );

        return res
            .status(200)
            .send({ ...tx.get(), newBalance: balance - quantity * price });
    });

    // POST

    TransactionRouter.post<
        string,
        FulfillmentParams,
        BaseResponse & Partial<Transaction>,
        never,
        never,
        AuthLocals
    >('/:transactionId/fulfill', async (req, res) => {
        const { user, isAdmin } = res.locals;
        const { params } = req;
        const { transactionId } = params;

        if (!user)
            return res.status(401).send({ error: 'No authorization provided' });

        if (!isAdmin) return res.status(403).send({ error: 'Not admin' });

        const transaction = await StoredTransaction.findByPk(transactionId);
        if (!transaction)
            return res.status(404).send({ error: 'Transaction not found' });

        if (transaction.get().fulfilled)
            return res.status(500).send({ error: 'Already fulfilled' });

        transaction.set('fulfilled', true);
        transaction.set('fulfilledBy', user.id);
        transaction.set('fulfillmentDate', new Date());

        try {
            const result = await transaction.save();
            const resultTx = result.get();

            return res.status(200).send(resultTx);
        } catch (e) {
            return res.status(500).send({ error: 'Failed to save to db' });
        }
    });

    return TransactionRouter;
};

export default getTransactionRouter;
