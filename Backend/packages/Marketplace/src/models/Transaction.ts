export interface Transaction {
    id: string | null;
    listingId: string;
    user: string;
    address: string | null;
    date: Date;
    quantity: number;
}

export default Transaction;
