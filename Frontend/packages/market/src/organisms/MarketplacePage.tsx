import { Header, useProvider, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import useLogin from '../api/hooks/useLogin';
import { ListingWithCount } from '../api/Models/Listing';
import BalanceWidget from '../atoms/BalanceWidget';
import DiscordLoginButton from '../atoms/DiscordLoginButton';
import Web3ConnectButton from '../atoms/Web3ConnectButton';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import ListingGrid from '../molecules/ListingGrid';

export const MarketplacePage = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { login } = useLogin();
    const { id: discordId } = useAuthorizationContext();
    const { homeUrl, discordUrl, openseaUrl, twitterUrl } =
        useGamingApeContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { accounts } = useProvider();

    const [selectedListing, setSelectedListing] =
        React.useState<ListingWithCount>();

    const onItemSelect = React.useCallback(
        (item?: ListingWithCount) => {
            if (!discordId) {
                login();
            }
            if (item?.requiresHoldership && !accounts) {
                setModalOpen(true);
            }
            setSelectedListing(item);
        },
        [accounts, discordId, login]
    );

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%',
            })}
        >
            <Header
                homeUrl={homeUrl}
                discordUrl={discordUrl}
                openseaUrl={openseaUrl}
                twitterUrl={twitterUrl}
                className={css({
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
            />
        </div>
    );
};

export default MarketplacePage;
