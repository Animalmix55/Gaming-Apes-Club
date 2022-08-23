/* eslint-disable react/jsx-props-no-spreading */
import {
    Header,
    RoundedHexagon,
    TABLET,
    useThemeContext,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import RankItem from '../atoms/RankItem';
import { dropShadowStyle } from '../common/styles';

const IMAGE =
    'https://lh3.googleusercontent.com/gtRedQThacyBS3cJikU2QXkyhJL6vmmz8GlLQAEB5f8GsiXlqjRxWgRKAlbxyu1cBbwUoidpo3vxp64VH8tkUPW00eepbiV126wmLA=w600';

const RANKS = [
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 1st', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 2nd', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 3rd', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 4th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 5th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 6th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 7th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 8th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 9th', xp: 100 },
    { name: 'Mr. Krockett', image: IMAGE, subtitle: 'Ranked 10th', xp: 100 },
];

const LeaderboardHeader = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div>
            <div
                className={css({
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                })}
            >
                <div
                    className={css({
                        marginRight: '-30px',
                    })}
                >
                    <RoundedHexagon id="rank-2" radius={5} width={96}>
                        <img
                            src={RANKS[1].image}
                            alt={RANKS[1].name}
                            className={css({
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                            })}
                        />
                    </RoundedHexagon>
                </div>
                <div
                    className={css({
                        zIndex: '5',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',

                            marginBottom: '24px',
                        })}
                    >
                        <p
                            className={css({
                                fontWeight: 600,
                                fontSize: '12px',
                                lineHeight: '16px',
                                letterSpacing: '0.02em',

                                color: theme.foregroundPallette.accent.toRgbaString(),
                            })}
                        >
                            1st
                        </p>
                        <p
                            className={css({
                                fontWeight: 900,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.03em',
                            })}
                        >
                            {RANKS[0].name}
                        </p>
                    </div>

                    <div
                        className={css({
                            ...dropShadowStyle,
                        })}
                    >
                        <RoundedHexagon id="rank-1" radius={5} width={140}>
                            <img
                                src={RANKS[0].image}
                                alt={RANKS[0].name}
                                className={css({
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                })}
                            />
                        </RoundedHexagon>
                    </div>
                </div>

                <div
                    className={css({
                        marginLeft: '-30px',
                    })}
                >
                    <RoundedHexagon id="rank-3" radius={5} width={96}>
                        <img
                            src={RANKS[2].image}
                            alt={RANKS[2].name}
                            className={css({
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                            })}
                        />
                    </RoundedHexagon>
                </div>
            </div>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '18px',
                })}
            >
                <div>
                    <p
                        className={css({
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',

                            color: theme.foregroundPallette.accent.toRgbaString(),
                        })}
                    >
                        2nd
                    </p>
                    <p
                        className={css({
                            fontWeight: 900,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.03em',
                        })}
                    >
                        {RANKS[1].name}
                    </p>
                </div>
                <div
                    className={css({
                        height: '38px',
                        width: '2px',
                        flexShrink: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    })}
                />
                <div>
                    <p
                        className={css({
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',

                            color: theme.foregroundPallette.accent.toRgbaString(),
                        })}
                    >
                        3rd
                    </p>
                    <p
                        className={css({
                            fontWeight: 900,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.03em',
                        })}
                    >
                        {RANKS[2].name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const Leaderboard = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const subheadingClass = css({
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '12px',
        letterSpacing: '0.02em',
    });

    return (
        <section
            className={css({
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),

                display: 'flex',
                flexDirection: 'column',
                gap: '24px',

                maxHeight: '508px',
                [TABLET]: {
                    maxHeight: 'unset',
                },
            })}
        >
            <Header title="Gac xp" subtitle="leaderboard" />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    overflowY: 'auto',

                    [TABLET]: {
                        overflowY: 'unset',
                    },
                })}
            >
                <div>
                    <p className={subheadingClass}>Your Rank</p>
                    <div className={css({ marginTop: '16px' })}>
                        <RankItem
                            name="Mr. Krockett"
                            image={IMAGE}
                            subtitle="Ranked 10th"
                            xp={102000}
                        />
                    </div>
                </div>
                <div
                    className={css({
                        isolation: 'isolate',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    })}
                >
                    <p className={subheadingClass}>Leaderboard</p>
                    <LeaderboardHeader />
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        })}
                    >
                        {RANKS.slice(3).map((item) => (
                            <RankItem key={item.subtitle} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
