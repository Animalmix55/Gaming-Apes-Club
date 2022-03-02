export interface Transaction {
    id?: string;
    listingId: string;
    user: string;
    date: Date;
    quantity: number;
}

export default Transaction;
