import { useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import Heading from '../atoms/Heading';
import Carousel from '../molecules/Carousel';
import UtilityImage from '../assets/news/utility-game-plan.png';
import GridCraftImage from '../assets/news/grid-craft.png';
import P2EImage from '../assets/news/p2e.png';
import { boxShadowStyle } from '../common/styles';

interface NewsType {
    image: string;
    title: string;
    url: string;
}

const NEWS: NewsType[] = [
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

const NewsItem = ({ image, title, url }: NewsType): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <a
            href={url}
            className={css({
                position: 'relative',
                width: '260px',
                borderRadius: '20px',
                aspectRatio: '264 / 120',

                overflow: 'hidden',
                padding: '24px',
                isolation: 'isolate',

                display: 'flex',
                alignItems: 'flex-end',

                fontFamily: theme.font,
                fontStyle: 'italic',
                fontWeight: 800,
                fontSize: '16px',
                lineHeight: '20px',
                textTransform: 'uppercase',
                color: theme.foregroundPallette.white.toRgbaString(),

                transition: '0.3s box-shadow linear',

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
                    zIndex: '-2',
                    filter: 'blur(1px)',
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
                {NEWS.map(({ image, title, url }) => (
                    <NewsItem key={url} image={image} title={title} url={url} />
                ))}
            </Carousel>
        </section>
    );
};

export default LatestNewsGrid;
