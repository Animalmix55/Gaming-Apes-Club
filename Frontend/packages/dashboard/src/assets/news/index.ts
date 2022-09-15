import Blur from './Blur.png';
import Gacland from './Gacland.png';
import MainBanner from './MainBanner.png';
import GACWeekly from './GACThumb.png';
import AlphaSharks from './AlphaSharks.jpg';
import Llamaverse from './llamaverse.jpg';

export interface NewsType {
    image: string;
    title: string;
    url: string;
}

const latestNews: NewsType[] = [
    {
        image: Llamaverse,
        title: 'GAC x Llamaverse Update',
        url: 'https://twitter.com/GamingApeClub/status/1569794263830888451?s=20&t=TqMJmIoiu7xZuKa1PwDhnw',
    },
    {
        image: Blur,
        title: 'Introducing GAC Weekly',
        url: 'https://twitter.com/GamingApeClub/status/1569005852366880775?s=20&t=Tzvd-aYBSYgfj-f7x7BW6w',
    },
    {
        image: MainBanner,
        title: 'Diamond District Merchandise',
        url: 'https://twitter.com/GamingApeClub/status/1565089157843755009?s=20&t=Tzvd-aYBSYgfj-f7x7BW6w',
    },
    {
        image: AlphaSharks,
        title: 'GAC x Alpha Sharks Partnership',
        url: 'https://twitter.com/GamingApeClub/status/1563591216054566914?s=20&t=nZ9BihbyRhKLKGgKelFcaw',
    },
    {
        image: Gacland,
        title: 'GACland BETA Access is now LIVE',
        url: 'https://twitter.com/GamingApeClub/status/1560750156848500736?s=20&t=nZ9BihbyRhKLKGgKelFcaw',
    },
];

const bannerNews = {
    image: MainBanner,
    title: 'Gaming Ape Club Stats',
    description:
        'Gaming Ape Club is a 6,550 Supply Genesis Collection. Currently 74% of the collection is staked. P2E GAC XP to exchange for NFTs, whitelists, and more.',
};

export default { latestNews, bannerNews };
