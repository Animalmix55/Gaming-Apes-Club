import React, { useMemo, useState } from 'react';
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
import useDiscordLogin from '../api/hooks/useDiscordLogin';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';

const COMING_SOON = true;

const Body = (): JSX.Element => {
    const [css] = useStyletron();
    const isMobile = useMatchMediaQuery(MOBILE);
    const { claims } = useAuthorizationContext();
    const discordId = useMemo(() => claims?.id, [claims]);

    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();

    const footerLinks = useMemo(() => {
        return [
            { name: 'Twitter', url: twitterUrl },
            { name: 'Discord', url: discordUrl },
            { name: 'OpenSea', url: openseaUrl },
        ];
    }, [discordUrl, openseaUrl, twitterUrl]);

    const { name, image, discord } = useMemo(
        () => ({
            name: claims?.member?.nick || claims?.username || 'My Profile',
            image: claims?.avatar
                ? `https://cdn.discordapp.com/avatars/${claims.id}/${claims.avatar}.png`
                : 'https://openseauserdata.com/files/433f3b338548fd8edb45df66cb293f89.png',
            discord: `${claims?.username}#${claims?.discriminator}`,
        }),
        [claims]
    );

    const [tab, setTab] = useState<'earnings' | 'leaderboard' | 'history'>(
        COMING_SOON ? 'history' : 'earnings'
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
                <ProfileHeader name={name} image={image} discord={discord} />
                {isMobile && !COMING_SOON && (
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
                {isMobile ? (
                    <>
                        {tab === 'earnings' && <SocialEarnings />}
                        {tab === 'leaderboard' && <Leaderboard />}
                        {tab === 'history' && (
                            <>
                                <Stats />
                                <PurchaseHistory discordId={discordId} />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div
                            className={css({
                                display: 'grid',
                                gridTemplateColumns: COMING_SOON
                                    ? '1fr 1fr'
                                    : '3fr 2fr',

                                gap: '24px',
                                [TABLET]: {
                                    gridTemplateColumns: '1fr',
                                },
                            })}
                        >
                            <SocialEarnings comingSoon={COMING_SOON} />
                            <Leaderboard comingSoon={COMING_SOON} />
                        </div>
                        <Stats />
                        <PurchaseHistory discordId={discordId} />
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
                <Footer links={footerLinks} />
            </div>
        </div>
    );
};

export const ProfilePage = (): JSX.Element => {
    const [css] = useStyletron();
    const { discordUrl, openseaUrl, twitterUrl } = useGamingApeContext();
    const { login, isLoggingIn } = useDiscordLogin();
    const { claims } = useAuthorizationContext();
    const discordId = useMemo(() => claims?.id, [claims]);

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
            <div>
                {discordId ? (
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
                        <ConnectDiscord
                            login={login}
                            isLoggingIn={isLoggingIn}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
