import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    Footer,
    MOBILE,
    Sidebar,
    SidebarItem,
    SidebarItems,
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

export const DashboardPage = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

    return (
        <div
            className={css({
                minHeight: '100vh',
                width: '100%',
                overflowX: 'hidden',
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
                        gap: '0.5rem',
                        padding: '3rem',
                    })}
                >
                    <NewsHeader />
                    <LatestNewsGrid />
                    <RecentListings />
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, auto)',
                            gap: '0.5rem',
                        })}
                    >
                        <LatestNewsBanner
                            className={css({ gridColumnStart: 'span 2' })}
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

export default DashboardPage;
