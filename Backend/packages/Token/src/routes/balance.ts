import express from 'express';
import { BaseResponse } from '@gac/shared';
import { getBalance, GridCraftClient } from '../helpers/Gridcraft';

interface GetRequest {
    discordId: string;
}

interface Response extends BaseResponse {
    balance?: number;
}

export const getBalanceRouter = (gridcraftClient: GridCraftClient) => {
    const BalanceRouter = express.Router();

    BalanceRouter.get<string, never, Response, never, GetRequest>(
        '/',
        async (req, res) => {
            const { query } = req;
            const { discordId } = query;

            if (!discordId)
                return res.status(400).send({ error: 'Missing discord id' });

            try {
                const total = await getBalance(gridcraftClient, discordId);

                return res.status(200).send({ balance: total });
            } catch (e) {
                console.error(`Failed to fetch balance for ${discordId}`, e);
                return res
                    .status(500)
                    .send({ error: 'Failed to retrieve balance' });
            }
        }
    );

    return BalanceRouter;
};

export default getBalanceRouter;
