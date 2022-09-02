/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TransactionItem from '../atoms/TransactionItem';
import '../styles/global.css';

export default {
    title: 'Profile/Atoms/TransactionItem',
    component: TransactionItem,
};

const Template = (
    args: React.ComponentProps<typeof TransactionItem>
): JSX.Element => {
    return (
        <div
            style={{
                padding: '3rem',
                backgroundColor: 'rgba(22, 28, 45, 0.8)',
            }}
        >
            <TransactionItem {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
    title: 'Fruity Loopz WL',
    description: '1 x whitelist to',
    address: '0xd1...ACE7',
    cost: 600,
};
