/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    ClassNameBuilder,
    useThemeContext,
    RoundedHexagon,
} from '@gac/shared-v2';
import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import TwitterImage from '../assets/png/Twitter.png';
import { dropShadowStyle, dropShadowTransition } from '../common/styles';
import useTwitterFollowers from '../hooks/useTwitterFollowers';

interface Props {
    className?: string;
    name: string;
    alias: string;
    title: string;
    image?: string;
    twitter?: string;
}

const MemberCard: React.FC<Props> = ({
    className,
    name,
    alias,
    title,
    image,
    twitter,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const [hover, setHover] = useState(false);

    const { data: followerCount } = useTwitterFollowers(twitter);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                })
            )}
        >
            <div
                className={ClassNameBuilder(
                    hover
                        ? css({
                              ...dropShadowStyle,
                          })
                        : undefined,
                    css({
                        transition: dropShadowTransition,
                    })
                )}
            >
                <RoundedHexagon id={name} width={215} radius={10}>
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

                                isolation: 'isolate',
                            })
                        )}
                        onMouseEnter={(): void => setHover(true)}
                        onMouseLeave={(): void => setHover(false)}
                    >
                        <img src={image} alt={`${name}`} />
                        <div
                            className={ClassNameBuilder(
                                css({
                                    position: 'absolute',
                                    inset: '0',

                                    opacity: hover ? '1' : '0',
                                    transition: 'opacity 0.2s linear',

                                    background: 'rgba(0, 0, 0, 0.9)',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(7.4px)',

                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',

                                    fontWeight: 700,
                                    fontSize: '16px',
                                    lineHeight: '20px',

                                    zIndex: 10,

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
                            {followerCount && (
                                <p
                                    className={css({
                                        fontWeight: 600,
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        letterSpacing: '0.02em',
                                        color: 'rgba(255,255,255,0.5)',
                                    })}
                                >
                                    {followerCount.toLocaleString()} Followers
                                </p>
                            )}
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
                <p
                    className={css({
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '20px',
                    })}
                >
                    {title}
                </p>
            </div>
        </div>
    );
};

export default MemberCard;
