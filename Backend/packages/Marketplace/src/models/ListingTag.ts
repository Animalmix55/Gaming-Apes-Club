import { Listing } from './Listing';

export interface ListingTag {
    id?: string;
    displayName: string;
}

export interface ListingTagToListing {
    listingId: string;
    tagId: string;
    /**
     * Must be loaded
     */
    tag?: ListingTag;
    /**
     * Must be loaded
     */
    listing?: Listing;
}
