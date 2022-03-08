import express from 'express';
import { BaseResponse } from '@gac/shared';
import { discordAuthMiddleware, DiscordOauth2 } from '@gac/login';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { Sequelize } from 'sequelize';
import StoredListing from '../database/models/StoredListing';
import {
    Listing,
    NewListing,
    sanitizeAndValidateListing,
    UpdatedListing,
} from '../models/Listing';

interface ListingWithCount extends Listing {
    totalPurchased: number;
}

interface GetRequest extends Record<string, string | undefined> {
    pageSize?: string;
    offset?: string;
    showDisabled?: string;
}

interface GetResponse extends BaseResponse {
    records?: ListingWithCount[];
    numRecords?: number;
}

type PostBody = NewListing;
type PostResponse = Partial<Listing> & BaseResponse;

type PutBody = UpdatedListing;
type PutResponse = PostResponse;

interface GetByIdParams {
    listingId: string;
}
type GetByIdReponse = Partial<Listing> & BaseResponse;

export const getListingRouter = (
    client: DiscordOauth2,
    guildId: string,
    adminRoles: string[]
) => {
    const ListingRouter = express.Router();

    ListingRouter.get<string, never, GetResponse, never, GetRequest, never>(
        '/',
        async (req, res) => {
            const { query } = req;
            const {
                offset: offsetStr,
                pageSize: pageSizeStr,
                showDisabled,
            } = query;

            const offset = Number(offsetStr || 0);
            const limit = Number(pageSizeStr || 1000);

            const { count, rows } = await StoredListing.findAndCountAll({
                offset,
                limit,
                attributes: {
                    include: [
                        [
                            Sequelize.literal(
                                '(SELECT SUM(Transactions.quantity) FROM Transactions WHERE Transactions.listingId = Listing.id)'
                            ),
                            'totalPurchased',
                        ],
                    ],
                },
                ...(showDisabled !== 'true' && {
                    where: {
                        disabled: false,
                    },
                }),
            });

            res.status(200).send({
                records: rows.map((r) => r.get() as ListingWithCount),
                numRecords: count,
            });
        }
    );

    ListingRouter.get<
        string,
        GetByIdParams,
        GetByIdReponse,
        never,
        never,
        never
    >('/:listingId', async (req, res) => {
        const { params } = req;
        const { listingId } = params;

        const listing = await StoredListing.findByPk(listingId);

        if (!listing)
            return res.status(404).send({ error: 'Listing not found' });

        return res.status(200).send(listing.get());
    });

    ListingRouter.post<
        string,
        never,
        PostResponse,
        PostBody,
        never,
        AuthLocals
    >(
        '/',
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
                return res.status(500).send({ error: `Error: ${e}` });
            }
        }
    );

    ListingRouter.put<string, never, PutResponse, PutBody, never, AuthLocals>(
        '/',
        discordAuthMiddleware(client, guildId, adminRoles),
        async (req, res) => {
            const { body } = req;
            const { isAdmin } = res.locals;

            if (!isAdmin) return res.status(403).send({ error: 'Not admin' });

            try {
                const listing = sanitizeAndValidateListing(body, false);
                const [numAffected] = await StoredListing.update(listing, {
                    where: {
                        id: listing.id,
                        disabled: false,
                    },
                });

                if (numAffected === 0)
                    return res.status(404).send({ error: 'Record not found' });

                const updatedListing = await StoredListing.findByPk(listing.id);
                if (!updatedListing)
                    return res.status(500).send({
                        error: 'Updated listing could not be retrieved',
                    });

                return res.status(200).send(updatedListing.get());
            } catch (e) {
                return res.status(500).send({ error: `Error: ${e}` });
            }
        }
    );

    return ListingRouter;
};

export default getListingRouter;
