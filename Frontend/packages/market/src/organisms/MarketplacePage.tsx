import {
    CoverVideo,
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
import BackgroundVideo from '../assets/webm/ComputerLights.webm';
import { TagFilter } from '../molecules/TagFilter';

export const MarketplacePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { login } = useLogin(true);
    const { adminRoles } = useGamingApeContext();
    const { token, claims } = useAuthorizationContext();
    const { homeUrl, discordUrl, openseaUrl, twitterUrl } =
        useGamingApeContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { accounts } = useProvider();

    const [adminPanelOpen, setAdminPanelOpen] = React.useState(false);
    const [selectedFilterTags, setSelectedFilterTags] = React.useState<
        string[]
    >([]);

    const listingRequest = useListings(
        undefined,
        undefined,
        undefined,
        undefined,
        selectedFilterTags
    );
    const { data: listings } = listingRequest;

    const [selectedIndex, setSelectedIndex] = React.useState<number>();
    const selectedListing =
        selectedIndex !== undefined
            ? listings?.records?.[selectedIndex]
            : undefined;

    const onItemSelect = React.useCallback(
        (index?: number) => {
            if (!token) {
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
        [accounts, listings, login, selectedIndex, token]
    );
    const theme = useThemeContext();

    const showConnectWeb3Button = React.useMemo(() => {
        const request = listingRequest.data;
        if (!request) return false;
        const { records } = request;

        if (!records) return false;

        return records.some((r) => !!r.requiresHoldership);
    }, [listingRequest.data]);

    const additionalButtons = React.useMemo((): HeaderButtonProps[] => {
        if (!claims) return [];
        const { member } = claims;
        if (!member) return [];

        if (adminPanelOpen) {
            return [
                {
                    displayText: 'MARKET',
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
                    displayText: 'ADMIN',
                    onClick: (): void => setAdminPanelOpen(true),
                },
            ];

        return [];
    }, [adminPanelOpen, adminRoles, claims]);

    return (
        <div
            className={css({
                overflow: 'hidden',
                position: 'relative',
                height: '100%',
                width: '100%',
            })}
        >
            <CoverVideo
                url={BackgroundVideo}
                aspectRatio={1.777777}
                className={css({ zIndex: -1 })}
                autoplay
                loop
            />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    height: '100%',
                    backgroundColor:
                        theme.backgroundColor.dark.toRgbaString(0.8),
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
                        zIndex: '1 !important',
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
                                [MOBILE]: {
                                    justifyContent: 'center',
                                },
                            })}
                        >
                            {showConnectWeb3Button && (
                                <Web3ConnectButton
                                    connectModalOpen={modalOpen}
                                    setConnectModalOpen={setModalOpen}
                                    className={css({
                                        marginLeft: 'auto',
                                        [MOBILE]: { marginRight: '5px' },
                                    })}
                                />
                            )}
                            <BalanceWidget
                                className={css({
                                    margin: showConnectWeb3Button
                                        ? '0px 10px'
                                        : '0px 10px 0px auto',
                                    [MOBILE]: { display: 'none' },
                                })}
                            />
                            <DiscordLoginButton
                                className={css({
                                    marginRight: 'auto',
                                    [MOBILE]: {
                                        marginLeft: '5px',
                                        marginRight: showConnectWeb3Button
                                            ? 'auto'
                                            : '0px',
                                    },
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
                        <TagFilter
                            className={css({
                                margin: '10px',
                                display: 'none',
                                [MOBILE]: {
                                    display: 'block',
                                },
                            })}
                            horizontal
                            selectedTags={selectedFilterTags}
                            setSelectedTags={setSelectedFilterTags}
                        />
                        <div
                            className={css({
                                display: 'flex',
                                flex: 1,
                                overflow: 'hidden',
                                [MOBILE]: {
                                    overflow: 'unset',
                                },
                            })}
                        >
                            <TagFilter
                                className={css({
                                    maxWidth: '350px',
                                    flex: 1,
                                    margin: '45px',
                                    [MOBILE]: {
                                        display: 'none',
                                    },
                                })}
                                selectedTags={selectedFilterTags}
                                setSelectedTags={setSelectedFilterTags}
                            />
                            <ListingGrid
                                className={css({
                                    flex: 1,
                                    overflow: 'auto',
                                    [MOBILE]: { overflow: 'unset' },
                                })}
                                onSelect={onItemSelect}
                                request={listingRequest}
                            />
                        </div>
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
        </div>
    );
};

export default MarketplacePage;
