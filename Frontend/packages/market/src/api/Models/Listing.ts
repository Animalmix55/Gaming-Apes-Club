export interface NewListing {
    title: string;
    description: string;
    image: string;
    price: number;
    supply?: number;
    maxPerUser?: number;
    requiresHoldership?: boolean;
    requiresLinkedAddress?: boolean;
    disabled?: boolean;
    roles: string[];
    discordMessage?: string;
}

export interface UpdatedListing extends NewListing {
    id: string;
}

export interface Listing extends NewListing {
    id: string;
    createdBy: string;
    createdOn: Date;
}

export interface ListingWithCount extends Listing {
    totalPurchased: number;
}
