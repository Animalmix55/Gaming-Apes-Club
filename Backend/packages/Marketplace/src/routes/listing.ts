import express from 'express';
import { BaseResponse } from '@gac/shared';
import { authMiddleware } from '@gac/login';
import AuthLocals from '@gac/login/lib/models/AuthLocals';
import { Sequelize } from 'sequelize';
import { v4 } from 'uuid';
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
import {
    HasListingRoles,
    HasRoleIds,
    mapToRoleId,
    mapToRoleIds,
} from '../models/ListingRole';
import ListingRole from '../database/models/ListingRole';
import { ListingTagEntity } from '../database/models/ListingTag';
import { ListingTagToListingEntity } from '../database/models/ListingTagToListing';
import { ListingTagToListing } from '../models/ListingTag';

interface GetRequest extends Record<string, string | undefined> {
    pageSize?: string;
    offset?: string;
    showDisabled?: 'true' | 'false';
    showInactive?: 'true' | 'false';
    /**
     * comma-delimited tag ids OR'ed
     */
    tags?: string;
}

interface GetResponse extends BaseResponse {
    records?: (ListingWithCount & HasRoleIds)[];
    numRecords?: number;
}

type PostBody = NewListing & Partial<HasRoleIds>;
type PostResponse = Partial<Listing & HasRoleIds> & BaseResponse;

type PutBody = UpdatedListing & Partial<HasRoleIds>;
type PutResponse = PostResponse;

interface GetByIdParams {
    listingId: string;
}
type GetByIdReponse = Partial<Listing & HasRoleIds> & BaseResponse;

export const getListingRouter = (
    jwtSecret: string,
    adminRoles: string[],
    sequelize: Sequelize
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
                    tags
                ));
            } catch (e) {
                console.error(
                    `Failed to fetch listings from db (showDisabled: ${showDisabled})`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to communicate with db' });
            }

            return res.status(200).send({
                records: mapToRoleIds(rows),
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

        return res.status(200).send(mapToRoleId<ListingWithCount>(listing));
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
                        ListingRole.create(
                            {
                                roleId: r,
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

            return res.status(200).send(mapToRoleId(response));
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
                            await ListingRole.create(
                                {
                                    roleId: r,
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

                return res.status(200).send(mapToRoleId(updatedListing));
            } catch (e) {
                return res
                    .status(500)
                    .send({ error: `Error: ${(e as Error).message}` });
            }
        }
    );

    return ListingRouter;
};

export default getListingRouter;
