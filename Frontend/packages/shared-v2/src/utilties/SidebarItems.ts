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
        icon: Icons.News,
        displayText: 'Whitepaper',
        id: 'Whitepaper',
        url: 'https://docs.gamingapeclub.com/what-now-for-gac/game-plan-v2',
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
        url: 'https://profile.gamingapeclub.com/',
    },
];

export default SidebarItems;
