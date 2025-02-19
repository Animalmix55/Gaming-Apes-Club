/* eslint-disable react/jsx-props-no-spreading */
import { Spinner, SpinnerSize } from '@fluentui/react';
import { Header, Icons, LinkButton, MOBILE, TABLET } from '@gac/shared-v2';
import { ethers } from 'ethers';
import React from 'react';
import { useStyletron } from 'styletron-react';
import ListingCard from '../atoms/ListingCard';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import useOpenSeaListings from '../hooks/useOpenSeaListings';
import Carousel from '../molecules/Carousel';
import DashboardSection from '../molecules/DashboardSection';

export const RecentListings = (): JSX.Element => {
    const [css] = useStyletron();

    const { isLoading, isError, data } = useOpenSeaListings();
    const { gamingApeClubAddress } = useGamingApeContext();

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
            {isLoading && (
                <div
                    className={css({
                        height: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <Spinner size={SpinnerSize.large} />
                </div>
            )}

            {!isLoading && isError && (
                <p
                    className={css({
                        height: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    Failed to fetch recent listings
                </p>
            )}

            {!isLoading && !isError && (
                <Carousel itemPaddingVertical={32} itemPaddingHorizontal={12}>
                    {(data || []).map((listing) => (
                        <ListingCard
                            key={listing.tokenId}
                            image={listing.metadata.image}
                            name={`${listing.metadata.name}`}
                            price={ethers.utils.formatEther(listing.price)}
                            url={`https://opensea.io/assets/ethereum/${gamingApeClubAddress}/${listing.tokenId}`}
                        />
                    ))}
                </Carousel>
            )}
        </DashboardSection>
    );
};

export default RecentListings;
