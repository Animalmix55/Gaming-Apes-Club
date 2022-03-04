import express from 'express';
import cors from 'cors';
import {
    BaseResponse,
    createJWT,
    generateLoginMessage,
    getGamingApeClubContract,
    verifyJWT,
    verifySignature,
} from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { getBalance, getUNBClient, spend } from '@gac/token';
import Web3 from 'web3';
import StoredListing from '../database/models/StoredListing';
import StoredTransaction from '../database/models/StoredTransaction';
import Transaction from '../models/Transaction';

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

export const getTransactionRouter = (
    unbToken: string,
    guildId: string,
    jwtPrivate: string,
    web3: Web3,
    gamingApeClubAddress: string
) => {
    const TransactionRouter = express.Router();

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
    >('/user/:userId', cors(), async (req, res) => {
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

    TransactionRouter.get<
        string,
        ListingParams,
        GetResponse,
        never,
        GetRequest,
        AuthLocals
    >('/listing/:listingId', cors(), async (req, res) => {
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
    >('/', cors(), async (req, res) => {
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
    >('/', cors(), async (req, res) => {
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

        const listing = await StoredListing.findByPk(listingId);
        if (!listing)
            return res.status(404).send({ error: 'Listing not found' });

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
        } = listing.get();

        if (disabled)
            return res.status(403).send({ error: 'Listing is disabled' });

        if (requiresHoldership) {
            if (!signature || !signableMessageToken) {
                const signableMessage = generateLoginMessage();
                const payload: TransactionJWTPayload = {
                    user: id,
                    signableMessage,
                };
                const jwt = createJWT(payload, jwtPrivate, '3m'); // token lasts 3 minutes
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
                if (numberHeld === '0')
                    return res.status(403).send({
                        error: 'You must be a token holder to transact.',
                    });
            } catch (e) {
                return res
                    .status(500)
                    .send({ error: 'Failed to communicate with blockchain' });
            }
        }

        if (
            requiresLinkedAddress &&
            (!recordableAddress || !Web3.utils.isAddress(recordableAddress))
        )
            return res.status(500).send({ error: 'Invalid linked address' });

        if (
            maxPerUser !== undefined &&
            quantity + quantityAlreadyPurchased > maxPerUser
        )
            return res.status(400).send({ error: 'Exceeds allowed quantity' });

        const client = getUNBClient(unbToken);
        const { total: balance } = await getBalance(client, guildId, id);

        // free for admin
        if (!isAdmin) {
            if (balance < quantity * price)
                return res.status(400).send({
                    error: `Unsufficient balance, you have a balance of ${balance}`,
                });

            try {
                // spend tokens
                await spend(client, guildId, id, quantity * price);
            } catch (e) {
                return res
                    .status(500)
                    .send({ error: 'Failed to spend tokens' });
            }
        }

        // generate transaction
        const tx = await StoredTransaction.create({
            listingId,
            user: id,
            quantity,
            address: requiresLinkedAddress ? recordableAddress : address,
        } as Transaction);

        const { total: newBalance } = await getBalance(client, guildId, id);

        return res.status(200).send({ ...tx.get(), newBalance });
    });

    return TransactionRouter;
};

export default getTransactionRouter;
