/* eslint-disable react/jsx-props-no-spreading */
import { Header, Icons, LinkButton, MOBILE, TABLET } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import ListingCard from '../atoms/ListingCard';
import Carousel from '../molecules/Carousel';
import DashboardSection from '../molecules/DashboardSection';

const listings = [
    {
        name: 'Gaming Ape Club #1151',
        price: '2.55',
        rank: '183',
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1151',
    },
    {
        name: 'Gaming Ape Club #1152',
        price: '2.55',
        rank: '183',
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1152',
    },
    {
        name: 'Gaming Ape Club #1153',
        price: '2.55',
        rank: '183',
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1153',
    },
    {
        name: 'Gaming Ape Club #1154',
        price: '2.55',
        rank: '183',
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1154',
    },
    {
        name: 'Gaming Ape Club #1155',
        price: '2.55',
        rank: '183',
        image: 'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600',
        url: 'https://opensea.io/assets/ethereum/0xac2a6706285b91143eaded25d946ff17a60a6512/1155',
    },
];

export const RecentListings = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <DashboardSection
            heading={<Header title="OpenSea's" subtitle="Recent Listings" />}
            action={
                <p
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',

                        [MOBILE]: {
                            flexDirection: 'column',
                        },
                    })}
                >
                    <span>View collection on</span>
                    <LinkButton
                        text="OpenSea"
                        href="https://opensea.io/collection/gamingapeclub"
                        icon={Icons.OpenSeaBlue}
                        themeType={{
                            backgroundColor: 'rgba(32, 129, 226, 0.2)',
                            hoveredBackgroundColor: '#2081E2',
                        }}
                    />
                </p>
            }
        >
            <Carousel itemPaddingVertical={32} itemPaddingHorizontal={12}>
                {listings.map((listing) => (
                    <ListingCard key={listing.url} {...listing} />
                ))}
            </Carousel>
        </DashboardSection>
    );
};

export default RecentListings;
