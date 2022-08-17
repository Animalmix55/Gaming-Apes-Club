import UtilityImage from './utility-game-plan.png';
import GridCraftImage from './grid-craft.png';
import P2EImage from './p2e.png';

export interface NewsType {
    image: string;
    title: string;
    url: string;
}

const latestNews: NewsType[] = [
    {
        image: UtilityImage,
        title: 'Gaming Ape Club Utility & Game Plan V1',
        url: '#',
    },
    {
        image: GridCraftImage,
        title: 'GAC x GridCraft Latest Updates',
        url: '#',
    },
    {
        image: P2EImage,
        title: 'Play 2 Earn Intergration has arrived!',
        url: '#',
    },
    {
        image: UtilityImage,
        title: 'Gaming Ape Club Utility & Game Plan V1',
        url: '#',
    },
    {
        image: GridCraftImage,
        title: 'GAC x GridCraft Latest Updates',
        url: '#',
    },
    {
        image: P2EImage,
        title: 'Play 2 Earn Intergration has arrived!',
        url: '#',
    },
];

const bannerNews = {
    image: GridCraftImage,
    title: 'GAC x GridCraft Latest Updates',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

export default { latestNews, bannerNews };
