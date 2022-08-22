export interface ListingTag {
    id?: string;
    displayName: string;
    listingCount?: number;
}

export interface ListingTagToListing {
    listingId: string;
    tagId: string;
    /**
     * Must be loaded
     */
    tag?: ListingTag;
}
