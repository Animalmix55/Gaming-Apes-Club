import { Header, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import TransactionList from '../molecules/TransactionList';

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

export const PurchaseHistory = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <section
            className={css({
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),

                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
        >
            <Header title="My purchase" subtitle="history" />
            <TransactionList transactions={transactions} />
        </section>
    );
};

export default PurchaseHistory;
