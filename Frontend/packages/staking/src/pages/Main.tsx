import React from 'react';
import { Sidebar, SidebarItem, Icons } from '@gac/shared-v2';
import { useStyletron } from 'styletron-react';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import Background from '../assets/png/BACKGROUND.png';
import { Header } from '../atoms/Header';

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
    const { OpenSeaUrl, TwitterUrl, DiscordUrl } = useAppConfiguration();

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
            <div>
                <div className={css({ margin: '32px 48px' })}>
                    <Header />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
