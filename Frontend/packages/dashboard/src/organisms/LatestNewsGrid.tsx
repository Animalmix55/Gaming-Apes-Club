import { useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import { boxShadowStyle, boxShadowTransition } from '../common/styles';
import newsData, { NewsType } from '../assets/news';

const NewsItem = ({ image, title, url }: NewsType): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <a
            href={url}
            className={css({
                position: 'relative',
                // width: '260px',
                marginInline: '4px',
                borderRadius: '20px',
                aspectRatio: '264 / 120',

                overflow: 'hidden',
                padding: '24px',
                isolation: 'isolate',

                display: 'flex',
                alignItems: 'flex-end',

                fontStyle: 'italic',
                fontWeight: 800,
                fontSize: '16px',
                lineHeight: '20px',
                textTransform: 'uppercase',
                color: theme.foregroundPallette.white.toRgbaString(),

                transition: boxShadowTransition,

                ':hover': {
                    ...boxShadowStyle,
                },

                ':focus': {
                    ...boxShadowStyle,
                },
            })}
        >
            <img
                src={image}
                alt=""
                className={css({
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '-2',
                    filter: 'blur(1px)',
                    objectFit: 'cover',
                })}
            />
            <div
                className={css({
                    position: 'absolute',
                    inset: '0',
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 84.24%)',
                    zIndex: '-1',
                })}
            />
            <p>{title}</p>
        </a>
    );
};

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
                    <NewsItem key={url} image={image} title={title} url={url} />
                ))}
            </Carousel>
        </section>
    );
};

export default LatestNewsGrid;
