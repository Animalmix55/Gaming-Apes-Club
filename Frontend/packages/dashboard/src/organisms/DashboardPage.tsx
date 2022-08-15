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

export const DashboardPage = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

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
