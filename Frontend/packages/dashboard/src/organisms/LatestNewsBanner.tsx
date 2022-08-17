import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import newsData from '../assets/news/data';

interface Props {
    className?: string;
}

export const LatestNewsBanner: React.FC<Props> = ({
    className,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <section
            className={ClassNameBuilder(
                className,
                css({
                    position: 'relative',
                    minHeight: '460px',

                    padding: '40px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    color: 'white',

                    display: 'flex',
                    alignItems: 'flex-end',
                })
            )}
        >
            <img
                className={css({
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                })}
                src={newsData.bannerNews.image}
                alt=""
            />

            <div
                className={css({
                    width: '75%',
                    borderRadius: '20px',
                    padding: '24px',

                    background: 'rgba(115, 91, 242, 0.4)',
                    backdropFilter: 'blur(40px)',

                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    /* Note: backdrop-filter has minimal browser support */
                })}
            >
                <h3
                    className={css({
                        fontWeight: 900,
                        fontSize: '28px',
                        lineHeight: '28px',
                        textTransform: 'uppercase',
                        fontStyle: 'italic',
                    })}
                >
                    {newsData.bannerNews.title}
                </h3>
                <p
                    className={css({
                        fontWeight: '500',
                        fontSize: '15px',
                        lineHeight: '22px',
                        marginTop: '16px',

                        wordWrap: 'break-word',
                        overflow: 'hidden',

                        display: '-webkit-box',
                        '-webkit-line-clamp': '3',
                        '-webkit-box-orient': 'vertical',
                    })}
                >
                    {newsData.bannerNews.description}
                </p>
            </div>
        </section>
    );
};

export default LatestNewsBanner;
