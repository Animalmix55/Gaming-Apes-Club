import { useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import specials from '../assets/specials';
import Heading from '../atoms/Heading';
import { boxShadowStyle, boxShadowTransition } from '../common/styles';
import Carousel from '../molecules/Carousel';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

export const ShackSpecials = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

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
                    highlightedTitle="The Shack's"
                    title="Special of the month"
                />
            </div>
            <Carousel>
                {specials.map(({ name, image, tag, cost, url }) => (
                    <a key={url} href={url}>
                        <div
                            className={css({
                                fontFamily: theme.font,

                                overflow: 'hidden',
                                borderRadius: '20px',

                                position: 'relative',
                                width: '300px',
                                height: '300px',
                                aspectRatio: '1 / 1',
                                padding: '24px',

                                transition: boxShadowTransition,

                                ':hover': {
                                    ...boxShadowStyle,
                                },

                                ':focus': {
                                    ...boxShadowStyle,
                                },

                                isolation: 'isolate',
                                color: 'white',

                                display: 'flex',
                                alignItems: 'flex-end',
                            })}
                        >
                            <div
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                })}
                            >
                                <div>
                                    <p
                                        className={css({
                                            fontWeight: '700',
                                            fontSize: '12px',
                                            lineHeight: '16px',

                                            display: 'inline-block',

                                            padding: '4px 8px',
                                            backgroundColor:
                                                'rgba(253, 0, 0, 0.9)',
                                            borderRadius: '8px',
                                        })}
                                    >
                                        {tag}
                                    </p>
                                </div>

                                <p
                                    className={css({
                                        fontStyle: 'italic',
                                        fontWeight: '900',
                                        fontSize: '28px',
                                        lineHeight: '34px',
                                    })}
                                >
                                    {name}
                                </p>
                                <p
                                    className={css({
                                        fontWeight: '900',
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        color: theme.foregroundPallette.accent.toRgbaString(),

                                        display: 'inline-flex',
                                        gap: '8px',
                                        alignItems: 'center',
                                    })}
                                >
                                    <span>{cost}</span>
                                    <img
                                        alt="XP"
                                        src={XPIcon}
                                        className={css({
                                            height: '16px',
                                            width: 'auto',
                                        })}
                                    />
                                </p>
                            </div>
                            <div
                                className={css({
                                    position: 'absolute',
                                    inset: '0',
                                    zIndex: '-1',
                                    background:
                                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 84.24%)',
                                })}
                            />
                            <img
                                className={css({
                                    position: 'absolute',
                                    inset: '0',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    zIndex: '-2',
                                })}
                                src={image}
                                alt=""
                            />
                        </div>
                    </a>
                ))}
            </Carousel>
        </section>
    );
};

export default ShackSpecials;
