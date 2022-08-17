import React from 'react';
import { useStyletron } from 'styletron-react';
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
                gap: '2rem',
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

                <a href="#">Check the news</a>
            </div>
            <Carousel
                items={{
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 5,
                }}
            >
                {newsData.latestNews.map(({ image, title, url }) => (
                    <NewsCard key={url} image={image} title={title} url={url} />
                ))}
            </Carousel>
        </section>
    );
};

export default LatestNewsGrid;
