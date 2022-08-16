/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import RoundedHexagon from './RoundedHexagon';
import TwitterImage from '../assets/png/Twitter.png';

interface Props {
    name: string;
    alias: string;
    title: string;
    image?: string;
    twitter?: string;
}

const MemberCard: React.FC<Props> = ({
    name,
    alias,
    title,
    image,
    twitter,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const [hover, setHover] = useState(false);

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            })}
        >
            <div
                className={
                    hover
                        ? css({
                              filter: 'drop-shadow(8px 8px 60px rgba(157, 0, 253, 0.3)) drop-shadow(-8px -8px 60px rgba(32, 129, 226, 0.3))',
                          })
                        : undefined
                }
            >
                <RoundedHexagon
                    id={name}
                    className={css({
                        width: '215px',
                    })}
                    radius={10}
                >
                    <a
                        href={`https://twitter.com/${twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={ClassNameBuilder(
                            css({
                                position: 'absolute',
                                inset: '0',
                                background: 'rgba(10,10,10,100)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                color: 'white',
                                textDecoration: 'none',
                            })
                        )}
                        onMouseEnter={(): void => setHover(true)}
                        onMouseLeave={(): void => setHover(false)}
                    >
                        <img src={image} alt={`${name}`} />
                        <div
                            className={ClassNameBuilder(
                                hover
                                    ? css({
                                          opacity: '1',
                                      })
                                    : undefined,
                                css({
                                    position: 'absolute',
                                    inset: '0',

                                    opacity: '0',
                                    background: 'rgba(0, 0, 0, 0.9)',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(7.4px)',
                                    transition: 'opacity 0.1s ease-in',

                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',

                                    fontWeight: 700,
                                    fontSize: '16px',
                                    lineHeight: '20px',

                                    ':focus': {
                                        opacity: '1',
                                    },
                                })
                            )}
                        >
                            <img
                                src={TwitterImage}
                                className={css({
                                    height: '30px',
                                    width: 'auto',
                                })}
                                alt=""
                            />
                            <p>@{twitter}</p>
                        </div>
                    </a>
                </RoundedHexagon>
            </div>

            <div
                className={css({
                    padding: '0 0.5rem',
                    textAlign: 'center',

                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',

                    fontFamily: theme.font,
                    fontStyle: 'italic',

                    color: theme.foregroundPallette.white.toRgbaString(),
                })}
            >
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '22px',
                        lineHeight: '28px',
                        textTransform: 'uppercase',
                    })}
                >
                    <span className={css({ display: 'block' })}>{name}</span>
                    <span
                        className={css({
                            display: 'block',
                            color: theme.foregroundPallette.primary.toRgbaString(),
                        })}
                    >
                        ({alias})
                    </span>
                </p>
                <p className={css({ fontWeight: 700, fontSize: '14px' })}>
                    {title}
                </p>
            </div>
        </div>
    );
};

export default MemberCard;
