import React, { useMemo } from 'react';
import { useStyletron } from 'styletron-react';
import {
    Footer,
    MOBILE,
    Sidebar,
    SidebarItem,
    SidebarItems,
    TABLET,
} from '@gac/shared-v2';
import Background from '@gac/shared-v2/lib/assets/png/background/BACKGROUND.png';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import NewsHeader from './NewsHeader';
import LatestNewsGrid from './LatestNewsGrid';
import RecentListings from './RecentListings';
import LatestNewsBanner from './LatestNewsBanner';
import HolderStats from './HolderStats';
import ShackSpecials from './ShackSpecials';
import TeamMembers from './TeamMembers';
import Partners from './Partners';
import { DASHBOARD_PADDING, DASHBOARD_PADDING_TABLET } from '../common/styles';

export const DashboardPage = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

    const footerLinks = useMemo(() => {
        return [
            { name: 'Twitter', url: twitterUrl },
            { name: 'Discord', url: discordUrl },
            { name: 'OpenSea', url: openseaUrl },
        ];
    }, [discordUrl, openseaUrl, twitterUrl]);

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
                selectedId="Home"
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
                <main
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3.6rem',
                        padding: DASHBOARD_PADDING,
                        [TABLET]: {
                            padding: DASHBOARD_PADDING_TABLET,
                        },
                    })}
                >
                    <NewsHeader />
                    <LatestNewsGrid />
                    <RecentListings />
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                            gap: '1.5rem',

                            [TABLET]: {
                                gap: '3.6rem',
                                gridTemplateColumns: '1fr',
                            },
                        })}
                    >
                        <LatestNewsBanner
                            className={css({
                                gridColumnStart: 'span 2',
                                [TABLET]: {
                                    gridColumnStart: 'span 1',
                                },
                            })}
                        />
                        <HolderStats />
                    </div>
                    <ShackSpecials />
                    <TeamMembers />
                    <Partners />
                </main>
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
        </div>
    );
};

export default DashboardPage;
