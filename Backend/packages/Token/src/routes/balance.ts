import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import { getBalance, getUNBClient } from '../helpers/Unbelieveaboat';

interface GetRequest {
    discordId: string;
}

interface Response extends BaseResponse {
    balance?: number;
}

export const getBalanceRouter = (apiToken?: string, guildId?: string) => {
    if (!apiToken || !guildId) {
        console.error('Missing token or guid id');
        process.exit(1);
    }

    const BalanceRouter = express.Router();
    const client = getUNBClient(apiToken);

    BalanceRouter.get<string, never, Response, never, GetRequest>(
        '/',
        cors(),
        async (req, res) => {
            const { query } = req;
            const { discordId } = query;

            try {
                const { total } = await getBalance(client, guildId, discordId);

                res.status(200).send({ balance: total });
                return;
            } catch (e) {
                res.status(500).send({ error: String(e) });
            }
        }
    );

    return BalanceRouter;
};

export default getBalanceRouter;
