import React from 'react';
import {
    Sidebar,
    SidebarItem,
    Icons,
    MOBILE,
    useWeb3,
    Footer,
} from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import Background from '../assets/png/BACKGROUND.png';
import { Header } from '../atoms/Header';
import { StakedApesTable } from '../molecules/StakedApesTable';
import { Dashboard } from '../atoms/Dashboard';
import { Basket } from '../atoms/Basket';
import { UnstakedApesTable } from '../molecules/UnstakedApesTable';
import { NeedMoreModule } from '../atoms/NeedMoreModule';

const sidebarItems: SidebarItem[] = [
    {
        icon: Icons.Home,
        displayText: 'Home',
        id: 'Home',
        disabled: true,
    },
    {
        icon: Icons.Mission,
        displayText: 'Mission',
        id: 'Mission',
        disabled: true,
    },
    {
        icon: Icons.News,
        displayText: 'News',
        id: 'News',
        disabled: true,
    },
    {
        icon: Icons.Shack,
        displayText: 'Shack',
        id: 'Shack',
        disabled: true,
    },
    {
        icon: Icons.Staking,
        displayText: 'Staking',
        id: 'Staking',
    },
    {
        icon: Icons.Profile,
        displayText: 'Profile',
        id: 'Profile',
        disabled: true,
    },
];

export const MainPage = (): JSX.Element => {
    const { OpenSeaUrl, TwitterUrl, DiscordUrl, EthereumChainId } =
        useAppConfiguration();
    const { accounts } = useWeb3(EthereumChainId);
    const account = accounts?.[0];

    const [css] = useStyletron();

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
                selectedId="Staking"
                items={sidebarItems}
                onDisordClick={
                    DiscordUrl
                        ? (): void => {
                              window.open(DiscordUrl, '_blank');
                          }
                        : undefined
                }
                onTwitterClick={
                    TwitterUrl
                        ? (): void => {
                              window.open(TwitterUrl, '_blank');
                          }
                        : undefined
                }
                onOpenSeaClick={
                    OpenSeaUrl
                        ? (): void => {
                              window.open(OpenSeaUrl, '_blank');
                          }
                        : undefined
                }
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
                        className={css({ [MOBILE]: { marginBottom: '40px' } })}
                    />
                    <Dashboard className={css({ marginLeft: 'auto' })} />
                </div>
                {account !== undefined && (
                    <>
                        <div
                            className={css({
                                padding: '48px',
                                width: '100%',
                                boxSizing: 'border-box',
                                [MOBILE]: {
                                    padding: '48px 0px 48px 24px',
                                },
                            })}
                        >
                            <StakedApesTable />
                        </div>
                        <div
                            className={css({
                                padding: '48px',
                                width: '100%',
                                boxSizing: 'border-box',
                                [MOBILE]: {
                                    padding: '48px 24px 48px 24px',
                                },
                            })}
                        >
                            <UnstakedApesTable />
                        </div>
                    </>
                )}
                <div
                    className={css({
                        padding: '48px',
                        [MOBILE]: {
                            padding: '48px 24px 48px 24px',
                        },
                    })}
                >
                    <NeedMoreModule
                        onClickOpenSea={(): unknown =>
                            window.open(OpenSeaUrl, '_blank')
                        }
                    />
                </div>
                <div
                    className={css({
                        padding: '48px',
                        [MOBILE]: {
                            padding: '48px 24px 48px 24px',
                        },
                    })}
                >
                    <Footer
                        openSeaUrl={OpenSeaUrl}
                        discordUrl={DiscordUrl}
                        twitterUrl={TwitterUrl}
                    />
                </div>
            </div>
            <Basket
                className={css({
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    left: '152px',
                    [MOBILE]: {
                        left: '16px',
                        right: '16px',
                    },
                })}
            />
        </div>
    );
};

export default MainPage;
