import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { getBalance, getUNBClient, spend } from '@gac/token';
import StoredListing from '../database/models/StoredListing';
import StoredTransaction from '../database/models/StoredTransaction';
import Transaction from '../models/Transaction';

interface PostResponse extends BaseResponse, Partial<Transaction> {
    success?: boolean;
    newBalance?: number;
}

interface PostRequest {
    listingId: string;
    quantity: number;
}

interface GetRequest {
    offset?: string;
    pageSize?: string;
}

interface GetResponse extends BaseResponse {
    results?: Transaction[];
    numRecords?: number;
}

export const getTransactionRouter = (unbToken: string, guildId: string) => {
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

        const { listingId, quantity } = body;
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

        const { maxPerUser, price } = listing.get();

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
        } as Transaction);

        const { total: newBalance } = await getBalance(client, guildId, id);

        return res.status(200).send({ ...tx.get(), newBalance });
    });

    return TransactionRouter;
};

export default getTransactionRouter;
