import { SidebarItem } from '../molecules/Sidebar';
import { Icons } from './Icons';

export const SidebarItems: (SidebarItem & { url?: string })[] = [
    {
        icon: Icons.Home,
        displayText: 'Home',
        id: 'Home',
        url: 'https://gamingapeclub.com/',
    },
    {
        icon: Icons.Mission,
        displayText: 'Mission',
        id: 'Mission',
        disabled: true,
    },
    {
        icon: Icons.News,
        displayText: 'Whitepaper',
        id: 'Whitepaper',
        url: 'http://docs.gamingapeclub.com/',
    },
    {
        icon: Icons.Shack,
        displayText: 'Shack',
        id: 'Shack',
        url: 'https://shack.gamingapeclub.com/',
    },
    {
        icon: Icons.Staking,
        displayText: 'Staking',
        id: 'Staking',
        url: 'https://staking.gamingapeclub.com/',
    },
    {
        icon: Icons.Profile,
        displayText: 'Profile',
        id: 'Profile',
        disabled: true,
    },
];

export default SidebarItems;
