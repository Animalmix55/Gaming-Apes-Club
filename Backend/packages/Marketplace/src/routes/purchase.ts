import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import AuthLocals from '@gac/login/lib/models/AuthLocals';

interface GetResponse extends BaseResponse {
    [x: string]: unknown;
}

export const getMarketplaceRouter = () => {
    const MarketplaceRouter = express.Router();

    MarketplaceRouter.get<string, never, GetResponse, never, never, AuthLocals>(
        '/',
        cors(),
        async (req, res) => {
            const { user, isAdmin } = res.locals;

            if (user) {
                return res.status(200).send({ ...user, isAdmin });
            }
            return res.status(404).send({ error: 'No user found' });
        }
    );

    return MarketplaceRouter;
};

export default getMarketplaceRouter;
