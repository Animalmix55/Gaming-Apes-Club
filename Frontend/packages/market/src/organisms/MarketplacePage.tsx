import { Header, MOBILE, useProvider, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useListings } from '../api/hooks/useListings';
import { useLogin } from '../api/hooks/useLogin';
import { BalanceWidget } from '../atoms/BalanceWidget';
import { DiscordLoginButton } from '../atoms/DiscordLoginButton';
import { Web3ConnectButton } from '../atoms/Web3ConnectButton';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { ListingGrid } from '../molecules/ListingGrid';
import { ListingModal } from '../molecules/ListingModal';

export const MarketplacePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { login } = useLogin(true);
    const { id: discordId } = useAuthorizationContext();
    const { homeUrl, discordUrl, openseaUrl, twitterUrl } =
        useGamingApeContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { accounts } = useProvider();

    const listingRequest = useListings();
    const { data: listings } = listingRequest;

    const [selectedIndex, setSelectedIndex] = React.useState<number>();
    const selectedListing =
        selectedIndex !== undefined
            ? listings?.records?.[selectedIndex]
            : undefined;

    const onItemSelect = React.useCallback(
        (index?: number) => {
            if (!discordId) {
                login();
                return;
            }

            const item =
                selectedIndex !== undefined
                    ? listings?.records?.[selectedIndex]
                    : undefined;

            if (item?.requiresHoldership && !accounts) {
                setModalOpen(true);
                return;
            }

            setSelectedIndex(index);
        },
        [accounts, discordId, listings?.records, login, selectedIndex]
    );
    const theme = useThemeContext();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%',
                backgroundColor: theme.backgroundColor.dark.toRgbaString(),
            })}
        >
            {selectedListing && (
                <ListingModal
                    listing={selectedListing}
                    onClose={(): void => setSelectedIndex(undefined)}
                />
            )}
            <Header
                homeUrl={homeUrl}
                discordUrl={discordUrl}
                openseaUrl={openseaUrl}
                twitterUrl={twitterUrl}
                className={css({
                    [MOBILE]: {
                        zIndex: 999999,
                    },
                    position: 'relative !important' as never,
                    marginBottom: '20px !important',
                })}
            />
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                })}
            >
                <Web3ConnectButton
                    connectModalOpen={modalOpen}
                    setConnectModalOpen={setModalOpen}
                    className={css({ marginLeft: 'auto' })}
                />
                <BalanceWidget className={css({ margin: '0px 10px' })} />
                <DiscordLoginButton className={css({ marginRight: 'auto' })} />
            </div>
            <ListingGrid
                className={css({ flex: 1, overflow: 'auto' })}
                onSelect={onItemSelect}
                request={listingRequest}
            />
        </div>
    );
};

export default MarketplacePage;
