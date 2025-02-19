import React, { useMemo } from 'react';
import {
    Sidebar,
    SidebarItem,
    SidebarItems,
    MOBILE,
    useWeb3,
    Footer,
    Header,
} from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';
import Background from '@gac/shared-v2/lib/assets/png/background/BACKGROUND.png';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { StakedApesTable } from '../molecules/StakedApesTable';
import { Dashboard } from '../atoms/Dashboard';
import { Basket } from '../atoms/Basket';
import { UnstakedApesTable } from '../molecules/UnstakedApesTable';
import { NeedMoreModule } from '../atoms/NeedMoreModule';

export const MainPage = (): JSX.Element => {
    const { OpenSeaUrl, TwitterUrl, DiscordUrl, EthereumChainId } =
        useAppConfiguration();
    const { accounts } = useWeb3(EthereumChainId);
    const account = accounts?.[0];

    const [css] = useStyletron();

    const footerLinks = useMemo(() => {
        return [
            { name: 'Twitter', url: TwitterUrl },
            { name: 'Discord', url: DiscordUrl },
            { name: 'OpenSea', url: OpenSeaUrl },
        ];
    }, [DiscordUrl, OpenSeaUrl, TwitterUrl]);

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
                items={SidebarItems}
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
                        subtitle="Staking Hub"
                        className={css({ [MOBILE]: { marginBottom: '40px' } })}
                    />
                    <Dashboard className={css({ marginLeft: 'auto' })} />
                </div>
                {account !== undefined && (
                    <>
                        <div
                            className={css({
                                width: '100%',
                            })}
                        >
                            <StakedApesTable
                                className={css({
                                    boxSizing: 'border-box',
                                    padding: '48px',
                                    [MOBILE]: {
                                        padding: '48px 0px 48px 24px',
                                    },
                                })}
                            />
                        </div>
                        <div
                            className={css({
                                width: '100%',
                            })}
                        >
                            <UnstakedApesTable
                                className={css({
                                    boxSizing: 'border-box',
                                    padding: '48px',
                                    [MOBILE]: {
                                        padding: '48px 0px 48px 24px',
                                    },
                                })}
                            />
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
                    <Footer links={footerLinks} />
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
