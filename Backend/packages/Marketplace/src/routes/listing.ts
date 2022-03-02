import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import { discordAuthMiddleware, DiscordOauth2 } from '@gac/login';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import StoredListing from '../database/models/StoredListing';
import {
    Listing,
    NewListing,
    sanitizeAndValidateListing,
} from '../models/Listing';

interface GetRequest extends Record<string, string | undefined> {
    pageSize?: string;
    offset?: string;
}

interface GetResponse extends BaseResponse {
    records?: Listing[];
    numRecords?: number;
}

type PostBody = Omit<NewListing, 'id'>;
type PostResponse = Partial<Listing> & BaseResponse;

export const getListingRouter = (
    client: DiscordOauth2,
    guildId: string,
    adminRoles: string[]
) => {
    const ListingRouter = express.Router();

    ListingRouter.get<string, never, GetResponse, never, GetRequest, never>(
        '/',
        cors(),
        async (req, res) => {
            const { query } = req;
            const { offset: offsetStr, pageSize: pageSizeStr } = query;

            const offset = offsetStr ? Number(offsetStr) : 0;
            const limit = pageSizeStr ? Number(pageSizeStr) : 1000;

            const { count, rows } = await StoredListing.findAndCountAll({
                offset,
                limit,
            });

            res.status(200).send({
                records: rows.map((r) => r.get()),
                numRecords: count,
            });
        }
    );

    ListingRouter.post<
        string,
        never,
        PostResponse,
        PostBody,
        never,
        AuthLocals
    >(
        '/',
        cors(),
        discordAuthMiddleware(client, guildId, adminRoles),
        async (req, res) => {
            const { body } = req;
            const { isAdmin, user } = res.locals;

            if (!isAdmin) return res.status(403).send({ error: 'Not admin' });

            try {
                const listing = sanitizeAndValidateListing(body, true);
                const dbListing = await StoredListing.create({
                    ...listing,
                    createdBy: user.id,
                } as Listing);
                return res.status(200).send(dbListing.get());
            } catch (e) {
                return res.status(500).send({ error: `Invalid model: ${e}` });
            }
        }
    );

    return ListingRouter;
};

export default getListingRouter;
