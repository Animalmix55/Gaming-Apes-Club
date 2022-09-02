import React, { useMemo } from 'react';
import { useTransactions } from '../api/hooks/useTransactions';
import PurchaseHistorySection from '../molecules/PurchaseHistorySection';
import { ToTransactionListItem } from '../utils/transactions';

interface Props {
    discordId: string | undefined;
}

export const PurchaseHistory = ({ discordId }: Props): JSX.Element => {
    const { data, isLoading, isError } = useTransactions(discordId, 0, 500);

    const transactions = useMemo(() => {
        return data?.results?.map(ToTransactionListItem);
    }, [data]);

    return (
        <PurchaseHistorySection
            isLoading={isLoading}
            isError={isError}
            transactions={transactions}
        />
    );
};

export default PurchaseHistory;
