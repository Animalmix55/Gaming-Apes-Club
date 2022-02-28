import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';

interface GetResponse extends BaseResponse {
    [x: string]: string | undefined;
}

export const getMarketplaceRouter = () => {
    const MarketplaceRouter = express.Router();

    MarketplaceRouter.get<string, never, GetResponse, never, never>(
        '/',
        cors(),
        async (req, res) => {
            const { user } = res.locals;

            if (user) {
                return res.status(200).send({ ...user });
            }
            return res.status(404).send({ error: 'No user found' });
        }
    );

    return MarketplaceRouter;
};

export default getMarketplaceRouter;
