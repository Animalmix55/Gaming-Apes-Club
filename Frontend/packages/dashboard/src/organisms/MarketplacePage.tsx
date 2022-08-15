import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    Button,
    ButtonType,
    Footer,
    Header,
    MOBILE,
    Sidebar,
    SidebarItem,
    SidebarItems,
    useWeb3,
    WalletLoginModal,
} from '@gac/shared-v2';
import Background from '@gac/shared-v2/lib/assets/png/background/BACKGROUND.png';
import { useListings } from '../api/hooks/useListings';
import { useLogin } from '../api/hooks/useLogin';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { ListingDetails } from '../molecules/ListingDetails';
import { ListingGrid } from '../molecules/ListingGrid';
import { ListingModal } from '../molecules/ListingModal';
import { TagFilter } from '../molecules/TagFilter';
import { Dashboard } from '../molecules/Dashboard';

export const MarketplacePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { login } = useLogin(true);
    const { adminRoles } = useGamingApeContext();
    const { token, claims } = useAuthorizationContext();
    const { discordUrl, openseaUrl, twitterUrl, chainId } =
        useGamingApeContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { accounts } = useWeb3();

    const isAdmin =
        adminRoles &&
        claims &&
        claims.member?.roles.some((heldRole) => adminRoles.includes(heldRole));

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

    return (
        <div
            className={css({
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                boxSizing: 'border-box',
                position: 'relative',
                [MOBILE]: {
                    paddingTop: '64px',
                },
            })}
        >
            <Sidebar
                selectedId="Shack"
                items={SidebarItems}
                onDisordClick={
                    discordUrl
                        ? (): void => {
                              window.open(discordUrl, '_blank');
                          }
                        : undefined
                }
                onTwitterClick={
                    twitterUrl
                        ? (): void => {
                              window.open(twitterUrl, '_blank');
                          }
                        : undefined
                }
                onOpenSeaClick={
                    openseaUrl
                        ? (): void => {
                              window.open(openseaUrl, '_blank');
                          }
                        : undefined
                }
                onSelectButton={(i: SidebarItem & { url?: string }): void => {
                    if (!i.url) return;
                    window.location.href = i.url;
                }}
            />
            <div
                className={css({
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: '100%',
                })}
            >
                <div
                    className={css({
                        margin: '32px 48px 6px 48px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        [MOBILE]: {
                            margin: '32px 24px 6px 24px',
                            flexWrap: 'wrap',
                        },
                    })}
                >
                    <Header
                        title="Gaming Ape Club's"
                        subtitle="Shopping Shack"
                        className={css({
                            [MOBILE]: {
                                marginBottom: '40px',
                                width: '100%',
                            },
                        })}
                    />
                    <Dashboard
                        additionalItems={
                            isAdmin
                                ? [
                                      <Button
                                          key="ADMIN_BUTTON"
                                          text={
                                              adminPanelOpen ? 'Home' : 'Admin'
                                          }
                                          className={css({
                                              marginLeft: '16px',
                                          })}
                                          themeType={ButtonType.secondary}
                                          onClick={(): void =>
                                              setAdminPanelOpen((a) => !a)
                                          }
                                      />,
                                  ]
                                : undefined
                        }
                        className={css({
                            marginLeft: 'auto',
                            [MOBILE]: { width: '100%' },
                        })}
                    />
                </div>
                {selectedListing && (
                    <ListingModal
                        listing={selectedListing}
                        onClose={(): void => setSelectedIndex(undefined)}
                    />
                )}
                {modalOpen && <WalletLoginModal chainId={chainId} />}
                {!adminPanelOpen && (
                    <div
                        className={css({
                            padding: '48px',
                            [MOBILE]: {
                                padding: '24px 0px',
                            },
                        })}
                    >
                        <TagFilter
                            className={css({
                                margin: '0px 0px 40px 0px',
                                [MOBILE]: {
                                    paddingLeft: '24px',
                                },
                            })}
                            selectedTags={selectedFilterTags}
                            setSelectedTags={setSelectedFilterTags}
                        />
                        <ListingGrid
                            onSelect={onItemSelect}
                            request={listingRequest}
                            className={css({
                                [MOBILE]: {
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    padding: '0px 24px',
                                },
                            })}
                            itemClass={css({
                                [MOBILE]: {
                                    width: '100%',
                                },
                            })}
                        />
                    </div>
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
                <div
                    className={css({
                        padding: '48px',
                        [MOBILE]: {
                            padding: '48px 24px 48px 24px',
                        },
                    })}
                >
                    <Footer
                        openSeaUrl={openseaUrl}
                        discordUrl={discordUrl}
                        twitterUrl={twitterUrl}
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketplacePage;
