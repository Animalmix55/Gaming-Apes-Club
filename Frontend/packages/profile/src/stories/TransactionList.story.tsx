/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TransactionList from '../molecules/TransactionList';
import '../styles/global.css';

export default {
    title: 'Profile/Molecules/TransactionList',
    component: TransactionList,
};

const DAYS = 86400000;

const transactions = [
    {
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: 'Fruity Loopz WL 3',
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: 600,
        createdAt: Date.now() - DAYS * 2,
    },
    {
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: 'Fruity Loopz WL 2',
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: 600,
        createdAt: Date.now() - 300,
    },
    {
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: 'Fruity Loopz WL 1',
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: 600,
        createdAt: Date.now(),
    },
    {
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: 'Fruity Loopz WL 4',
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: 600,
        createdAt: Date.now() - DAYS * 3,
    },
    {
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        title: 'Fruity Loopz WL 5',
        description: '1 x whitelist to',
        address: '0xd1...ACE7',
        cost: 600,
        createdAt: Date.now() - DAYS * 3,
    },
];

export const List = (): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'rgba(22, 28, 45, 0.8)',
            }}
        >
            <TransactionList transactions={transactions} />
        </div>
    );
};
