import { ListingTag } from './ListingTag';

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
    roles: string[];
    discordMessage: string | null;
    startDate: string | null;
    endDate: string | null;
    tags?: ListingTag[];
    resultantRole: string | null;
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
