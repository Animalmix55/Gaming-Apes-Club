/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStyletron } from 'styletron-react';
import GroupedList from '../atoms/GroupedList';
import TransactionItem from '../atoms/TransactionItem';

export interface TransactionListItem {
    image: string;
    title: string;
    description: string;
    address: string;
    cost: number;
    createdAt: number;
}

interface Props {
    transactions: TransactionListItem[];
}

const TransactionList: React.FC<Props> = ({ transactions }): JSX.Element => {
    const [css] = useStyletron();
    if (transactions.length === 0) {
        return (
            <p
                className={css({
                    height: '200px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                No transactions found
            </p>
        );
    }

    return (
        <GroupedList
            items={transactions}
            render={(item): React.ReactElement => (
                <TransactionItem
                    key={`${item.createdAt}-${item.title}-${item.cost}`}
                    {...item}
                />
            )}
        />
    );
};

export default TransactionList;
