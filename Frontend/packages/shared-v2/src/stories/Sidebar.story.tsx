/* eslint-disable no-void */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Web3ContextProvider } from '../contexts/Web3Context';
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
        displayText: 'Game Plan',
        id: 'Game Plan',
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
    const [selection, setSelection] = React.useState(defaultItems[0].id);

    return (
        <Web3ContextProvider>
            <Sidebar
                items={defaultItems}
                onSelectButton={(b): void => setSelection(b.id)}
                selectedId={selection}
                className={css({ height: '100vh' })}
                onTwitterClick={(): void => void 0}
                onDisordClick={(): void => void 0}
                onOpenSeaClick={(): void => void 0}
            />
        </Web3ContextProvider>
    );
};
