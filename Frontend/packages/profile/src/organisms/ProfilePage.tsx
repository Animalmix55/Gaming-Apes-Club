import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import {
    Button,
    ButtonType,
    Footer,
    MOBILE,
    Sidebar,
    SidebarItem,
    SidebarItems,
    TABLET,
    useMatchMediaQuery,
} from '@gac/shared-v2';
import Background from '@gac/shared-v2/lib/assets/png/background/BACKGROUND.png';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { PADDING, PADDING_TABLET } from '../common/styles';
import ConnectDiscord from '../molecules/ConnectDiscord';
import ProfileHeader from '../atoms/ProfileHeader';
import Stats from './Stats';
import PurchaseHistory from './PurchaseHistory';
import SocialEarnings from './SocialEarnings';
import Leaderboard from './Leaderboard';

const FooterLinks = [
    {
        name: 'Cookie Policy',
        url: '#',
    },
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms & Conditions', url: '#' },
];

const Body = (): JSX.Element => {
    const [css] = useStyletron();
    const isMobile = useMatchMediaQuery(MOBILE);

    const [tab, setTab] = useState<'earnings' | 'leaderboard' | 'history'>(
        'earnings'
    );

    return (
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
                    gap: '1.5rem',
                    padding: PADDING,
                    [TABLET]: {
                        padding: PADDING_TABLET,
                    },
                })}
            >
                <ProfileHeader
                    name="Mr. Krockett"
                    image="https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600"
                    discord="Mr Krockett#0014"
                />
                {isMobile && (
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '8px',

                            '@media (max-width: 360px)': {
                                gridTemplateColumns: '1fr',
                            },
                        })}
                    >
                        <Button
                            text="Earnings"
                            themeType={
                                tab === 'earnings'
                                    ? ButtonType.primary
                                    : ButtonType.secondary
                            }
                            onClick={(): void => setTab('earnings')}
                        />
                        <Button
                            text="Leaderboard"
                            themeType={
                                tab === 'leaderboard'
                                    ? ButtonType.primary
                                    : ButtonType.secondary
                            }
                            onClick={(): void => setTab('leaderboard')}
                        />
                        <Button
                            text="History"
                            themeType={
                                tab === 'history'
                                    ? ButtonType.primary
                                    : ButtonType.secondary
                            }
                            onClick={(): void => setTab('history')}
                        />
                    </div>
                )}
                {(!isMobile || tab === 'earnings') && <SocialEarnings />}
                {(!isMobile || tab === 'leaderboard') && <Leaderboard />}
                {(!isMobile || tab === 'history') && (
                    <>
                        <Stats />
                        <PurchaseHistory />
                    </>
                )}
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
    );
};

export const ProfilePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

    const [loggedIn, setLoggedIn] = useState(true);

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
                selectedId="Profile"
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
            {loggedIn ? (
                <Body />
            ) : (
                <div
                    className={css({
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: PADDING,
                    })}
                >
                    <ConnectDiscord />
                    <Button
                        onClick={(): void => setLoggedIn(true)}
                        text="Next screen"
                    />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
