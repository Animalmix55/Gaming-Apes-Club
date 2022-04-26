import { Sequelize, Op } from 'sequelize';
// eslint-disable-next-line import/no-unresolved
import { Literal } from 'sequelize/types/utils';
import ListingRole from '../database/models/ListingRole';
import { ListingTagEntity } from '../database/models/ListingTag';
import { ListingTagToListingEntity } from '../database/models/ListingTagToListing';
import StoredListing from '../database/models/StoredListing';
import { Listing } from '../models/Listing';
import { HasListingRoles } from '../models/ListingRole';

interface ListingWithStringCount extends Listing {
    totalPurchased: string;
}

export interface ListingWithCount extends Listing {
    totalPurchased: number;
}

const include = [
    [
        Sequelize.literal(
            '(SELECT SUM(Transactions.quantity) FROM Transactions WHERE Transactions.listingId = Listing.id)'
        ),
        'totalPurchased',
    ],
] as [Literal, string][];

export const getListingsWithCounts = async (
    offset = 0,
    limit = 1000,
    showDisabled = false,
    showInactive = false,
    tags: string[] = []
) => {
    const { count, rows } = await StoredListing.findAndCountAll({
        offset,
        limit,
        distinct: true,
        order: [['price', 'ASC']],
        attributes: {
            include,
        },
        where: {
            ...(!showDisabled && { disabled: false }),
            ...(!showInactive && {
                startDate: {
                    [Op.or]: {
                        [Op.lte]: new Date(),
                        [Op.eq]: null,
                    },
                },
                endDate: {
                    [Op.or]: {
                        [Op.gt]: new Date(),
                        [Op.eq]: null,
                    },
                },
            }),
        },
        include: [
            {
                model: ListingRole,
                as: 'roles',
            },
            ...(tags.length > 0
                ? [
                      {
                          model: ListingTagToListingEntity,
                          as: 'listingToTags',
                          where: {
                              tagId: {
                                  [Op.in]: tags,
                              },
                          },
                      },
                  ]
                : []),
            {
                model: ListingTagEntity,
                as: 'tags',
            },
        ],
    });

    return {
        count,
        rows: rows.map((r) => {
            const retrievedResult = r.get() as ListingWithStringCount;
            return {
                ...retrievedResult,
                totalPurchased: Number(retrievedResult.totalPurchased),
            } as ListingWithCount & HasListingRoles;
        }),
    };
};

export const getListingWithCount = async (listingId: string) => {
    const result = await StoredListing.findByPk(listingId, {
        attributes: {
            include,
        },
        include: [
            {
                model: ListingRole,
                as: 'roles',
            },
            {
                model: ListingTagEntity,
                as: 'tags',
            },
        ],
    });

    if (!result) return undefined;
    const retrievedResult = result.get() as ListingWithStringCount;

    return {
        ...retrievedResult,
        totalPurchased: Number(retrievedResult.totalPurchased),
    } as ListingWithCount & HasListingRoles;
};

export default {};
