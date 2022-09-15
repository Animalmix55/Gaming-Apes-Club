import React from 'react';
import { LinkButton, Header } from '@gac/shared-v2';
import Carousel from '../molecules/Carousel';
import newsData from '../assets/news';
import NewsCard from '../atoms/NewsCard';
import DashboardSection from '../molecules/DashboardSection';

export const LatestNewsGrid = (): JSX.Element => {
    return (
        <DashboardSection
            heading={
                <Header title="Gaming Ape Club's" subtitle="Latest News" />
            }
            action={
                <LinkButton
                    text="Stay Updated 👋"
                    href="https://www.twitter.com/GamingApeClub"
                />
            }
        >
            <Carousel itemPaddingVertical={32} itemPaddingHorizontal={12}>
                {newsData.latestNews.map(({ image, title, url }) => (
                    <div key={title} itemID={title}>
                        <NewsCard image={image} title={title} url={url} />
                    </div>
                ))}
            </Carousel>
        </DashboardSection>
    );
};

export default LatestNewsGrid;
