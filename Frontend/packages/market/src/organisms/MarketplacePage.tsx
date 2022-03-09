import {
    Header,
    HeaderButtonProps,
    MOBILE,
    useProvider,
    useThemeContext,
} from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useListings } from '../api/hooks/useListings';
import { useLogin } from '../api/hooks/useLogin';
import { BalanceWidget } from '../atoms/BalanceWidget';
import { DiscordLoginButton } from '../atoms/DiscordLoginButton';
import { Web3ConnectButton } from '../atoms/Web3ConnectButton';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { ListingDetails } from '../molecules/ListingDetails';
import { ListingGrid } from '../molecules/ListingGrid';
import { ListingModal } from '../molecules/ListingModal';

export const MarketplacePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { login } = useLogin(true);
    const { adminRoles } = useGamingApeContext();
    const { id: discordId, member } = useAuthorizationContext();
    const { homeUrl, discordUrl, openseaUrl, twitterUrl } =
        useGamingApeContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { accounts } = useProvider();

    const [adminPanelOpen, setAdminPanelOpen] = React.useState(false);

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
        [accounts, discordId, listings, login, selectedIndex]
    );
    const theme = useThemeContext();

    const additionalButtons = React.useMemo((): HeaderButtonProps[] => {
        if (!member) return [];
        if (adminPanelOpen) {
            return [
                {
                    displayText: 'Market',
                    onClick: (): void => setAdminPanelOpen(false),
                },
            ];
        }
        if (
            member.roles.some((r) =>
                adminRoles?.some((adminRole) => r === adminRole)
            )
        )
            return [
                {
                    displayText: 'Admin',
                    onClick: (): void => setAdminPanelOpen(true),
                },
            ];

        return [];
    }, [adminPanelOpen, adminRoles, member]);

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '100%',
                backgroundColor: theme.backgroundColor.dark.toRgbaString(),
                [MOBILE]: {
                    overflow: 'auto',
                },
            })}
        >
            {selectedListing && (
                <ListingModal
                    listing={selectedListing}
                    onClose={(): void => setSelectedIndex(undefined)}
                />
            )}
            <Header
                additionalButtons={additionalButtons}
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
            {!adminPanelOpen && (
                <>
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
                            className={css({
                                marginLeft: 'auto',
                                [MOBILE]: { marginRight: '5px' },
                            })}
                        />
                        <BalanceWidget
                            className={css({
                                margin: '0px 10px',
                                [MOBILE]: { display: 'none' },
                            })}
                        />
                        <DiscordLoginButton
                            className={css({
                                marginRight: 'auto',
                                [MOBILE]: { marginLeft: '5px' },
                            })}
                        />
                    </div>
                    <div
                        className={css({
                            display: 'none',
                            [MOBILE]: { display: 'block' },
                        })}
                    >
                        <BalanceWidget
                            className={css({
                                margin: '10px',
                            })}
                        />
                    </div>
                    <ListingGrid
                        className={css({
                            flex: 1,
                            overflow: 'auto',
                            [MOBILE]: { overflow: 'unset' },
                        })}
                        onSelect={onItemSelect}
                        request={listingRequest}
                    />
                </>
            )}
            {adminPanelOpen && (
                <div
                    className={css({
                        overflow: 'auto',
                        flex: '1',
                        margin: '40px',
                        [MOBILE]: { margin: '10px' },
                    })}
                >
                    <ListingDetails />
                </div>
            )}
        </div>
    );
};

export default MarketplacePage;
