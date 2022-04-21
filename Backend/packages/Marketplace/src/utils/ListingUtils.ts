import { Sequelize } from 'sequelize';
// eslint-disable-next-line import/no-unresolved
import { Literal } from 'sequelize/types/utils';
import ListingRole from '../database/models/ListingRole';
import { ListingTagEntity } from '../database/models/ListingTag';
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
    showDisabled = false
) => {
    const { count, rows } = await StoredListing.findAndCountAll({
        offset,
        limit,
        order: [['price', 'ASC']],
        attributes: {
            include,
        },
        ...(!showDisabled && {
            where: {
                disabled: false,
            },
        }),
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
