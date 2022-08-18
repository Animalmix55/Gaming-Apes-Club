import React from 'react';
import { useStyletron } from 'styletron-react';
import { LinkButton } from '@gac/shared-v2';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import newsData from '../assets/news';
import NewsCard from '../atoms/NewsCard';

export const LatestNewsGrid = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section
            className={css({
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                <Heading
                    className={css({ flex: '1' })}
                    highlightedTitle="Gaming Ape Club's"
                    title="Latest News"
                />

                <LinkButton text="Check the news" href="#" />
            </div>
            <Carousel itemPaddingVertical={32} itemPaddingHorizontal={12}>
                {newsData.latestNews.map(({ image, title, url }, i) => (
                    <div key={url} itemID={`${title}-${i}`}>
                        <NewsCard image={image} title={title} url={url} />
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default LatestNewsGrid;
