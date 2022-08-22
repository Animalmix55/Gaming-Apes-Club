import { Listing } from './Listing';

export interface Transaction {
    id?: string;
    listingId: string;
    user: string;
    address?: string;
    date: Date;
    quantity: number;
    totalCost?: number;
    fulfilled: boolean;
    fulfilledBy?: string;
    fulfillmentDate?: Date;
    refunded: boolean;
    refundedBy?: string;
    refundDate?: Date;
    listing?: Listing;
}
