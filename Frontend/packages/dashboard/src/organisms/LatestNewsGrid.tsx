import React from 'react';
import { LinkButton } from '@gac/shared-v2';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import newsData from '../assets/news';
import NewsCard from '../atoms/NewsCard';
import DashboardSection from '../molecules/DashboardSection';

export const LatestNewsGrid = (): JSX.Element => {
    return (
        <DashboardSection
            heading={
                <Heading
                    highlightedTitle="Gaming Ape Club's"
                    title="Latest News"
                />
            }
            action={<LinkButton text="Check the news" href="#" />}
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
