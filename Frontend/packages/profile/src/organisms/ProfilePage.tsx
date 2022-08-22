import React from 'react';
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
import { DASHBOARD_PADDING, DASHBOARD_PADDING_TABLET } from '../common/styles';

const FooterLinks = [
    {
        name: 'Cookie Policy',
        url: '#',
    },
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms & Conditions', url: '#' },
];

export const ProfilePage = (): JSX.Element => {
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
                        gap: '3.6rem',
                        padding: DASHBOARD_PADDING,
                        [TABLET]: {
                            padding: DASHBOARD_PADDING_TABLET,
                        },
                    })}
                >
                    <p>Hello</p>
                </main>
                <div
                    className={css({
                        padding: '48px',
                        [MOBILE]: {
                            padding: '48px 24px 48px 24px',
                        },
                    })}
                >
                    <Footer links={FooterLinks} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
