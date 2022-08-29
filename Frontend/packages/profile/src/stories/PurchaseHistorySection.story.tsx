import React from 'react';
import { Transaction } from '../api/Models/Transaction';
import { PurchaseHistorySection } from '../molecules/PurchaseHistorySection';
import '../styles/global.css';
import { ToTransactionListItem } from '../utils/transactions';
import data from './data/transactions.json';

export default {
    title: 'Profile/Molecules/PurchaseHistorySection',
    component: PurchaseHistorySection,
};

const transactions = (data.results as unknown as Transaction[]).map(
    ToTransactionListItem
);

export const Regular = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <PurchaseHistorySection transactions={transactions} />
        </div>
    );
};

export const EmptyTransactions = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <PurchaseHistorySection transactions={[]} />
        </div>
    );
};

export const Loading = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <PurchaseHistorySection isLoading />
        </div>
    );
};

export const Error = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <PurchaseHistorySection isError />
        </div>
    );
};
