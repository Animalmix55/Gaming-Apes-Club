import express from 'express';
import {
    applyRole,
    BaseResponse,
    createJWT,
    generateLoginMessage,
    getClient,
    getGamingApeClubContract,
    getGuildMember,
    verifyJWT,
    verifySignature,
} from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { spend, GridCraftClient } from '@gac/token';
import Web3 from 'web3';
import { Intents } from 'discord.js';
import { v4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import { Sequelize, Transaction as SequelizeTransaction } from 'sequelize';
import StoredTransaction from '../database/models/StoredTransaction';
import Transaction from '../models/Transaction';
import { getListing, getListingWithCount } from '../utils/ListingUtils';
import { sendTransactionMessage } from '../utils/Discord';
import { HasListingRoles } from '../models/ListingRole';
import { Listing } from '../models/Listing';

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
    gridcraftClient: GridCraftClient,
    guildId: string,
    jwtPrivate: string,
    web3: Web3,
    gamingApeClubAddress: string,
    discordBotToken: string,
    discordTransactionChannelId: string,
    sequelize: Sequelize,
    defaultTxMessage: string
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

        let count: number;
        let rows: StoredTransaction[];
        try {
            ({ count, rows } = await StoredTransaction.findAndCountAll({
                offset,
                limit,
                where: {
                    user: userId,
                },
            }));
        } catch (e) {
            console.error(
                `Failed to fetch transactions (user filter: ${userId})`,
                e
            );
            return res
                .status(500)
                .send({ error: 'Failed to communicate with db' });
        }

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

        let count: number;
        let rows: StoredTransaction[];
        try {
            ({ count, rows } = await StoredTransaction.findAndCountAll({
                offset,
                limit,
                where: {
                    listingId,
                },
            }));
        } catch (e) {
            console.error(
                `Failed to fetch transactions (lsting filter: ${listingId})`,
                e
            );
            return res
                .status(500)
                .send({ error: 'Failed to communicate with db' });
        }

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

        let count: number;
        let rows: StoredTransaction[];
        try {
            ({ count, rows } = await StoredTransaction.findAndCountAll({
                offset,
                limit,
            }));
        } catch (e) {
            console.error(`Failed to fetch transactions`, e);
            return res
                .status(500)
                .send({ error: 'Failed to communicate with db' });
        }

        return res
            .status(200)
            .send({ results: rows.map((r) => r.get()), numRecords: count });
    });

    // POST

    const fiveSecondLimiter = rateLimit({
        windowMs: 5 * 1000, // 5 sec
        max: 1,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: 'You have been ratelimited for 5s, sorry!' },
    });

    const minuteLimiter = rateLimit({
        windowMs: 30 * 1000, // 30 sec
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: 'You have been ratelimited for 30s, sorry!' },
    });

    TransactionRouter.post<
        string,
        never,
        PostResponse,
        PostRequest,
        never,
        AuthLocals
    >('/', fiveSecondLimiter, minuteLimiter, async (req, res) => {
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
            `Processing a transaction for ${id} to purchase ${quantity} of listingId ${listingId} from ip address ${req.ip}`
        );

        let listing: (Listing & HasListingRoles) | undefined;
        try {
            listing = await getListing(listingId);
        } catch (e) {
            console.error(`Failed to fetch listing ${listingId}`, e);
            return res
                .status(500)
                .send({ error: 'Failed to communicate with db' });
        }

        if (!listing) {
            console.log(
                `${id} requested a transaction on non-existant listing ${listingId}`
            );
            return res.status(404).send({ error: 'Listing not found' });
        }

        if (
            listing.startDate !== null &&
            listing.startDate.valueOf() > Date.now()
        ) {
            console.log(
                `${id} requested a transaction on listing ${listingId} which has not yet begun`
            );

            return res.status(400).send({ error: 'Listing not yet started' });
        }

        if (
            listing.endDate !== null &&
            listing.endDate.valueOf() <= Date.now()
        ) {
            console.log(
                `${id} requested a transaction on listing ${listingId} which has already ended`
            );

            return res.status(400).send({ error: 'Listing has concluded' });
        }

        let address: string | undefined;
        const {
            maxPerUser,
            price,
            requiresHoldership,
            requiresLinkedAddress,
            disabled,
            supply,
            roles: requiredRoles,
            resultantRole,
        } = listing;

        if (disabled) {
            console.log(
                `${id} requested a transaction on disabled listing ${listing.title} (${listingId})`
            );
            return res.status(403).send({ error: 'Listing is disabled' });
        }

        // always fetch the newest role
        if (requiredRoles.length > 0) {
            const requiredRoleIds = requiredRoles.map((r) => r.roleId);
            try {
                const guildMember = await getGuildMember(
                    discordClient,
                    id,
                    guildId
                );

                const roles = guildMember.roles.cache;

                if (
                    !requiredRoleIds.every((reqRoleId) => roles.has(reqRoleId))
                ) {
                    console.log(
                        `${id} requested a transaction for listing ${
                            listing.title
                        } (${listingId}) but they lacked the required roles (${requiredRoleIds.join(
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
                fiveSecondLimiter.resetKey(req.ip); // don't limit the subsequent 5s request, once.
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
                return res.status(500).send({
                    error: 'Failed to communicate with blockchain',
                });
            }
        }

        if (
            requiresLinkedAddress &&
            (!recordableAddress || !Web3.utils.isAddress(recordableAddress))
        ) {
            console.log(
                `User ${id} provided an invalid linked address ${recordableAddress} to purchase ${listing.title} (${listingId})`
            );
            return res.status(400).send({ error: 'Invalid linked address' });
        }

        const totalCost = price * quantity;

        // deduct from balance
        if (!isAdmin) {
            try {
                console.log(
                    `Deducting ${totalCost} from ${id} prior to running the transaction.`
                );
                await spend(gridcraftClient, id, totalCost);

                console.log(
                    `Successfully deducted ${totalCost} from user ${id}. Proceeding.`
                );
            } catch (e) {
                console.error(
                    `Failed to deduct ${totalCost} from the balance of user ${id}.`,
                    e
                );
                return res.status(500).send({
                    error: `Failed to deduct ${totalCost} from balance`,
                });
            }
        }

        let sequelizeTransaction: SequelizeTransaction;
        try {
            sequelizeTransaction = await sequelize.transaction();
        } catch (e) {
            console.error(
                `Failed to begin sequelize transaction for ${id} to purchase ${quantity} of ${listingId}.`,
                e
            );

            return res
                .status(500)
                .send({ error: 'Failed to communicate with database' });
        }

        let totalPurchased: number;
        let tx: StoredTransaction;

        try {
            ({ totalPurchased } = await getListingWithCount(
                listingId,
                sequelizeTransaction,
                true
            ));

            if (supply !== null && quantity + totalPurchased > supply) {
                console.log(
                    `${id} tried to purchase ${
                        listing.title
                    } (${listingId}) but it was sold out (quantity desired: ${quantity}, quantity remaining ${
                        supply - totalPurchased
                    }).`
                );

                sequelizeTransaction.rollback();

                return res
                    .status(400)
                    .send({ error: 'Exceeds available supply' });
            }

            const previousTransactions = await StoredTransaction.findAll({
                where: {
                    listingId,
                    user: id,
                },
                transaction: sequelizeTransaction,
            });

            const quantityAlreadyPurchased = previousTransactions.reduce(
                (prev, cur) => prev + cur.get().quantity,
                0
            );

            if (
                maxPerUser !== null &&
                maxPerUser !== 0 &&
                quantity + quantityAlreadyPurchased > maxPerUser
            ) {
                console.log(
                    `${id} tried to purchase ${listing.title} (${listingId}) but they already maxxed out per user (max: ${maxPerUser}, purchased: ${quantityAlreadyPurchased}, desired: ${quantity}).`
                );

                sequelizeTransaction.rollback();

                return res.status(400).send({
                    error: 'Exceeds available supply for this user',
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

            tx = await StoredTransaction.create(localTx, {
                transaction: sequelizeTransaction,
            });
            console.log(
                `Generated transaction for user ${id} purchasing ${
                    listing.title
                } (${listingId}) with id ${tx.get().id}`
            );

            await sequelizeTransaction.commit();
        } catch (e) {
            const errorId = v4();

            console.error(
                `Failed to complete transaction for for ${id} to purchase ${quantity} of ${listing.title} (${listingId}), restoring balance for ${id} and rolling back transaction. Error id: ${errorId}`
            );
            sequelizeTransaction.rollback();

            return res.status(500).send({
                error: `Failed to complete transaction. Error id: ${errorId}`,
            });
        }

        const newTransaction = tx.get();

        console.log(
            `Transaction ${newTransaction.id} successfully published to the database.`
        );

        if (resultantRole) {
            console.log(
                `Attempting to give ${id} the role ${resultantRole} for purchasing ${listing.title} (${listingId})`
            );
            applyRole(discordClient, id, guildId, resultantRole)
                .then(() =>
                    console.log(
                        `Gave user ${id} the role ${resultantRole} for purchasing ${listing?.title} (${listingId})`
                    )
                )
                .catch((e) => {
                    console.error(
                        `Failed to give user ${id} the role ${resultantRole} for purchasing ${listing?.title} (${listingId})`,
                        e
                    );
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
            listing,
            tx.get(),
            defaultTxMessage
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

        return res.status(200).send({ ...tx.get() });
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

        let transaction: StoredTransaction | null;
        try {
            transaction = await StoredTransaction.findByPk(transactionId);
        } catch (e) {
            console.error(
                `Failed to fetch transaction ${transactionId} from database`,
                e
            );
            return res
                .status(500)
                .send({ error: 'Failed to communicate with DB' });
        }

        if (!transaction)
            return res.status(404).send({ error: 'Transaction not found' });

        if (transaction.get().fulfilled)
            return res.status(400).send({ error: 'Already fulfilled' });

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
