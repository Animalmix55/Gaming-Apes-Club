import { HasRoleIds } from './ListingRole';
import { ListingTag, ListingTagToListing } from './ListingTag';

export interface NewListing {
    title: string;
    description: string;
    image: string;
    price: number;
    supply: number | null;
    maxPerUser: number | null;
    requiresHoldership: boolean | null;
    requiresLinkedAddress: boolean | null;
    disabled: boolean | null;
    discordMessage: string | null;
    /**
     * The id of a role to apply after purchase
     */
    resultantRole: string | null;
    tags?: ListingTag[];
    listingToTags?: ListingTagToListing[];
}

export interface UpdatedListing extends NewListing {
    id: string;
}

export interface Listing extends NewListing {
    id: string;
    createdBy: string;
    createdOn: Date;
}

interface Sanitizer {
    (model: NewListing & Partial<HasRoleIds>, add: true): {
        listing: NewListing;
        roles: HasRoleIds['roles'];
        tags: ListingTag[];
    };
    (model: UpdatedListing & Partial<HasRoleIds>, add?: false): {
        listing: UpdatedListing;
        roles: HasRoleIds['roles'];
        tags: ListingTag[];
    };
}

export const sanitizeAndValidateListing: Sanitizer = (model, add) => {
    const {
        title,
        description,
        image,
        price,
        supply,
        maxPerUser,
        id,
        requiresHoldership,
        requiresLinkedAddress,
        disabled,
        roles,
        discordMessage,
        resultantRole,
        tags,
    } = model as UpdatedListing & Partial<HasRoleIds>;

    if (!add && !id) throw new Error('Missing id');
    if (add && id) throw new Error('New records cannot contain an id');
    if (add && disabled) throw new Error('Cannot create a disabled record');
    if (typeof title !== 'string' || !title.trim())
        throw new Error('Invalid title');
    if (typeof description !== 'string' || !description.trim())
        throw new Error('Invalid description');
    if (typeof image !== 'string' || !image.trim())
        throw new Error('Invalid image');
    if (!price || typeof price !== 'number') throw new Error('Invalid price');
    if (supply && typeof supply !== 'number') throw new Error('Invalid supply');
    if (maxPerUser && typeof maxPerUser !== 'number')
        throw new Error('Invalid user maximum');
    if (requiresHoldership && typeof requiresHoldership !== 'boolean')
        throw new Error('Invalid holdership requirement flag');
    if (requiresLinkedAddress && typeof requiresLinkedAddress !== 'boolean')
        throw new Error('Invalid linked address requirement flag');
    if (discordMessage && typeof discordMessage !== 'string')
        throw new Error('Invalid discord message');
    if (resultantRole && typeof resultantRole !== 'string')
        throw new Error('Invalid resultant role');

    return {
        listing: {
            title,
            description,
            image,
            price,
            supply,
            maxPerUser,
            requiresHoldership,
            requiresLinkedAddress,
            discordMessage,
            resultantRole,
            ...(!add && { id, disabled }),
        },
        roles: roles || [],
        tags: tags || [],
    } as never;
};
