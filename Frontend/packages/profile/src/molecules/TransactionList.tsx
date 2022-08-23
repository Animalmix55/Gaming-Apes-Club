/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import GroupedList from '../atoms/GroupedList';
import TransactionItem from '../atoms/TransactionItem';

interface Transaction {
    image: string;
    title: string;
    description: string;
    address: string;
    cost: number;
    createdAt: number;
}

interface Props {
    transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }): JSX.Element => {
    return (
        <GroupedList
            items={transactions}
            render={(item): React.ReactElement => <TransactionItem {...item} />}
        />
    );
};

export default TransactionList;
