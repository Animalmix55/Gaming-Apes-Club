/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ListingCard from '../atoms/ListingCard';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/ListingCard',
    component: ListingCard,
};

const Template = (
    args: React.ComponentProps<typeof ListingCard>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <ListingCard {...args} />
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {
    name: 'Gaming Ape Club #1152',
    price: '2.55',
    rank: '183',
    image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
    url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1152',
};
