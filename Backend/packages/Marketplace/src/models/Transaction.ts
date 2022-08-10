import { Listing } from './Listing';

export interface Transaction {
    id: string | null;
    listingId: string;
    user: string;
    address: string | null;
    date: Date;
    quantity: number;
    fulfilled: boolean;
    totalCost: number | null;
    fulfilledBy: string | null;
    fulfillmentDate: Date | null;
    refunded: boolean;
    refundedBy: string | null;
    refundDate: Date | null;
    listing?: Listing;
}

export default Transaction;
