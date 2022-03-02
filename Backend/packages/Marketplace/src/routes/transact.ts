import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { getBalance, getUNBClient, spend } from '@gac/token';
import StoredListing from '../database/models/StoredListing';
import StoredTransaction from '../database/models/StoredTransaction';

interface PostResponse extends BaseResponse {
    success?: boolean;
    newBalance?: number;
}

interface PostRequest {
    listingId: string;
    quantity: number;
}

export const getTransactionRouter = (unbToken: string, guildId: string) => {
    const TransactionRouter = express.Router();

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

        if (balance < quantity * price)
            return res.status(400).send({
                error: `Unsufficient balance, you have a balance of ${balance}`,
            });

        // spend tokens
        await spend(client, guildId, id, quantity * price);
    });

    return TransactionRouter;
};

export default getTransactionRouter;
