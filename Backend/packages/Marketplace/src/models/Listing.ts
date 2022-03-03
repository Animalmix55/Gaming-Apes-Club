export interface NewListing {
    title: string;
    description: string;
    image: string;
    price: number;
    supply?: number;
    maxPerUser?: number;
    requiresHoldership?: boolean;
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
    (model: NewListing, add: true): NewListing;
    (model: UpdatedListing, add?: false): UpdatedListing;
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
    } = model as UpdatedListing;

    if (!add && !id) throw new Error('Missing id');
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

    return {
        title,
        description,
        image,
        price,
        supply,
        maxPerUser,
        requiresHoldership,
        ...(!add && { id }),
    } as never;
};