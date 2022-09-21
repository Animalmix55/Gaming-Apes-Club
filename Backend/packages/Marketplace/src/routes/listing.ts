import express from 'express';
import { BaseResponse } from '@gac/shared';
import { authMiddleware } from '@gac/login';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { give, GridCraftClient } from '@gac/token';
import StoredListing from '../database/models/StoredListing';
import {
    Listing,
    NewListing,
    sanitizeAndValidateListing,
    UpdatedListing,
} from '../models/Listing';
import {
    getListingsWithCounts,
    getListingWithCount,
    ListingWithCount,
} from '../utils/ListingUtils';
import { HasListingRoles } from '../models/ListingRole';
import ListingRole from '../database/models/ListingRole';
import { ListingTagEntity } from '../database/models/ListingTag';
import { ListingTagToListingEntity } from '../database/models/ListingTagToListing';
import { ListingTagToListing } from '../models/ListingTag';
import StoredTransaction from '../database/models/StoredTransaction';

interface GetRequest extends Record<string, string | undefined> {
    pageSize?: string;
    offset?: string;
    showDisabled?: 'true' | 'false';
    showInactive?: 'true' | 'false';
    showHidden?: 'true' | 'false';
    /**
     * comma-delimited tag ids OR'ed
     */
    tags?: string;
}

interface GetResponse extends BaseResponse {
    records?: (ListingWithCount & HasListingRoles)[];
    numRecords?: number;
}

type PostBody = NewListing & Partial<HasListingRoles>;
type PostResponse = Partial<Listing & HasListingRoles> & BaseResponse;

type PutBody = UpdatedListing & Partial<HasListingRoles>;
type PutResponse = PostResponse;

interface GetByIdParams {
    listingId: string;
}
type GetByIdReponse = Partial<Listing & HasListingRoles> & BaseResponse;

interface PostRefundParams {
    listingId: string;
}

export const getListingRouter = (
    jwtSecret: string,
    adminRoles: string[],
    sequelize: Sequelize,
    gridcraftClient: GridCraftClient
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
                showHidden,
                tags: tagsStr,
                showInactive,
            } = query;

            const tags = !tagsStr ? [] : tagsStr.split(',');
            const offset = Number(offsetStr || 0);
            const limit = Number(pageSizeStr || 1000);

            let count: number;
            let rows: (ListingWithCount & HasListingRoles)[];
            try {
                ({ count, rows } = await getListingsWithCounts(
                    offset,
                    limit,
                    showDisabled === 'true',
                    showInactive === 'true',
                    showHidden === 'true',
                    tags
                ));
            } catch (e) {
                console.error(
                    `Failed to fetch listings from db (showDisabled: ${showDisabled}, showInactive: ${showInactive}, showHidden: ${showHidden})`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to communicate with db' });
            }

            return res.status(200).send({
                records: rows,
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

        let listing: (ListingWithCount & HasListingRoles) | undefined;

        try {
            listing = await getListingWithCount(listingId);
        } catch (e) {
            console.error(`Failed to fetch listing ${listingId}`, e);
            return res
                .status(500)
                .send({ error: 'Failed to communicate with db' });
        }

        if (!listing)
            return res.status(404).send({ error: 'Listing not found' });

        return res.status(200).send(listing);
    });

    ListingRouter.post<
        string,
        never,
        PostResponse,
        PostBody,
        never,
        AuthLocals
    >('/', authMiddleware(jwtSecret, adminRoles), async (req, res) => {
        const { body } = req;
        const { isAdmin, user } = res.locals;

        if (!isAdmin) return res.status(403).send({ error: 'Not admin' });

        let dbListing: StoredListing;
        try {
            const { listing, roles, tags } = sanitizeAndValidateListing(
                body,
                true
            );

            const tx = await sequelize.transaction();

            try {
                dbListing = await StoredListing.create(
                    {
                        ...listing,
                        createdBy: user.id,
                    } as Listing,
                    { transaction: tx }
                );

                await Promise.all(
                    roles.map(async (r) => {
                        const { blacklisted, roleId } = r;
                        ListingRole.create(
                            {
                                roleId,
                                blacklisted: !!blacklisted,
                                listingId: dbListing.get().id,
                            },
                            { transaction: tx }
                        );
                    })
                );

                const dbTags = (
                    await Promise.all(
                        tags.map(async (r) =>
                            ListingTagEntity.upsert(
                                {
                                    ...r,
                                    id: r.id ?? v4(),
                                },
                                { transaction: tx }
                            )
                        )
                    )
                ).map((r) => r[0]);

                await ListingTagToListingEntity.bulkCreate(
                    dbTags.map(
                        (t): ListingTagToListing => ({
                            listingId: dbListing.getDataValue('id'),
                            tagId: t.getDataValue('id') as string,
                        })
                    ),
                    {
                        transaction: tx,
                    }
                );

                await tx.commit();
            } catch (e) {
                await tx.rollback();
                throw e;
            }

            const response = await getListingWithCount(dbListing.get().id);
            if (!response) throw new Error('Could not refetch new record');

            return res.status(200).send(response);
        } catch (e) {
            return res
                .status(500)
                .send({ error: (e as { message: string })?.message });
        }
    });

    ListingRouter.put<string, never, PutResponse, PutBody, never, AuthLocals>(
        '/',
        authMiddleware(jwtSecret, adminRoles),
        async (req, res) => {
            const { body } = req;
            const { isAdmin } = res.locals;

            if (!isAdmin) return res.status(403).send({ error: 'Not admin' });

            const NOT_FOUND = 'Record not found';

            try {
                const { listing, roles, tags } = sanitizeAndValidateListing(
                    body,
                    false
                );

                const tx = await sequelize.transaction();

                try {
                    const [numAffected] = await StoredListing.update(listing, {
                        where: {
                            id: listing.id,
                            disabled: false,
                        },
                        transaction: tx,
                    });

                    if (numAffected === 0) throw new Error(NOT_FOUND);

                    await ListingRole.destroy({
                        where: {
                            listingId: listing.id,
                        },
                        transaction: tx,
                    });

                    await Promise.all(
                        roles.map(async (r) => {
                            const { roleId, blacklisted } = r;
                            await ListingRole.create(
                                {
                                    roleId,
                                    blacklisted: !!blacklisted,
                                    listingId: listing.id,
                                },
                                { transaction: tx }
                            );
                        })
                    );

                    const dbTags = (
                        await Promise.all(
                            tags.map(async (r) =>
                                ListingTagEntity.upsert(
                                    {
                                        ...r,
                                        id: r.id ?? v4(),
                                    },
                                    { transaction: tx }
                                )
                            )
                        )
                    ).map((r) => r[0]);

                    await ListingTagToListingEntity.destroy({
                        where: {
                            listingId: listing.id,
                        },
                        transaction: tx,
                    });

                    await ListingTagToListingEntity.bulkCreate(
                        dbTags.map(
                            (t): ListingTagToListing => ({
                                listingId: listing.id,
                                tagId: t.getDataValue('id') as string,
                            })
                        ),
                        {
                            transaction: tx,
                        }
                    );

                    await tx.commit();
                } catch (e) {
                    await tx.rollback();
                    if ((e as Error).message === NOT_FOUND)
                        return res
                            .status(404)
                            .send({ error: 'Record not found' });
                    throw e;
                }

                const updatedListing = await getListingWithCount(listing.id);
                if (!updatedListing)
                    return res.status(500).send({
                        error: 'Updated listing could not be retrieved',
                    });

                return res.status(200).send(updatedListing);
            } catch (e) {
                return res
                    .status(500)
                    .send({ error: `Error: ${(e as Error).message}` });
            }
        }
    );

    ListingRouter.post<
        string,
        PostRefundParams,
        BaseResponse,
        never,
        never,
        AuthLocals
    >('/:listingId/refund', async (req, res) => {
        const { params } = req;
        const { isAdmin, user } = res.locals;
        const { listingId } = params;
        const { id: userId } = user;

        if (!isAdmin) return res.status(403).send({ error: 'Not admin' });
        if (!listingId)
            return res.status(401).send({ error: 'Missing listing id' });

        const listing = await StoredListing.findByPk(listingId);
        if (!listing)
            return res.status(404).send({ error: 'Listing not found' });

        const { price: listingPrice } = listing.get();
        const transactions = await StoredTransaction.findAll({
            where: { listingId },
        });

        await Promise.all(
            transactions.map(async (tx) => {
                const { totalCost, quantity, user, id } = tx.get();

                const refundAmount = totalCost ?? quantity * listingPrice;
                try {
                    await give(gridcraftClient, user, refundAmount);
                } catch (e) {
                    console.error(
                        `Failed to refund ${user} ${refundAmount} for tx ${id}`,
                        e
                    );

                    return;
                }

                tx.set('refundDate', new Date());
                tx.set('refunded', true);
                tx.set('refundedBy', userId);

                await tx.save();
            })
        );

        return res.status(200).send({});
    });

    return ListingRouter;
};

export default getListingRouter;
