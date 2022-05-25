/* eslint-disable no-void */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Sidebar, SidebarItem } from '../molecules/Sidebar';
import { Icons } from '../utilties/Icons';

export default {
    title: 'Shared/v2/Molecules/Sidebar',
    component: Sidebar,
};

const defaultItems: SidebarItem[] = [
    {
        icon: Icons.Home,
        displayText: 'Home',
        id: 'Home',
    },
    {
        icon: Icons.Mission,
        displayText: 'Mission',
        id: 'Mission',
    },
    {
        icon: Icons.News,
        displayText: 'News',
        id: 'News',
    },
    {
        icon: Icons.Shack,
        displayText: 'Shack',
        id: 'Shack',
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
    },
];

export const StandAlone = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <Sidebar
            items={defaultItems}
            className={css({ height: '100vh' })}
            onTwitterClick={(): void => void 0}
            onDisordClick={(): void => void 0}
            onOpenSeaClick={(): void => void 0}
        />
    );
};
