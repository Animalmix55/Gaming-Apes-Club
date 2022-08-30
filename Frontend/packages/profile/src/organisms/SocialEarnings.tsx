import {
    ClassNameBuilder,
    Header,
    Icons,
    MOBILE,
    TokenDisplay,
    useThemeContext,
} from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import StatItem from '../atoms/StatItem';

interface InformationProps {
    image?: string;
    title: string;
    leftText: string;
    rightText: string;
    progress: number;
    progressForegroundClassName?: string;
    progressBackgroundClassName?: string;
}

const Information: React.FC<InformationProps> = ({
    image,
    title,
    leftText,
    rightText,
    progress,
    progressForegroundClassName,
    progressBackgroundClassName,
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <div>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                })}
            >
                {image && <img src={image} alt="" />}
                <p
                    className={css({
                        flex: 1,
                        fontWeight: 900,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.03em',
                    })}
                >
                    {title}
                </p>
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0,
                    })}
                >
                    <p
                        className={css({
                            fontWeight: 900,
                            fontSize: '14px',
                            lineHeight: '18px',
                            letterSpacing: '0.1em',
                        })}
                    >
                        {leftText}
                    </p>
                    <p
                        className={css({
                            fontWeight: 700,
                            fontSize: '10px',
                            lineHeight: '14px',
                            letterSpacing: '0.05em',

                            opacity: 0.6,
                        })}
                    >
                        / {rightText}
                    </p>
                </div>
            </div>
            <div
                className={css({
                    marginTop: '12px',
                })}
            >
                <div
                    className={ClassNameBuilder(
                        progressBackgroundClassName,
                        css({
                            height: '12px',
                            width: '100%',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            position: 'relative',
                        })
                    )}
                >
                    <div
                        className={ClassNameBuilder(
                            progressForegroundClassName,
                            css({
                                height: '100%',
                                width: `${progress * 100}%`,
                                borderRadius: '40px',
                            })
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const DiscordEarnings = (): JSX.Element => {
    const [css] = useStyletron();

    const textClass = css({
        fontWeight: 900,
        fontSize: '20px !important',
        lineHeight: '32px',
        letterSpacing: '0.1em !important',
    });

    const titleClass = css({
        fontSize: '12px !important',
        lineHeight: '16px !important',
        letterSpacing: '0.03em !important',
    });

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',

                justifyContent: 'center',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <img
                    src={Icons.DiscordPurple}
                    alt=""
                    className={css({
                        height: '14px',
                        width: 'auto',
                    })}
                />
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '18px',
                        lineHeight: '28px',
                    })}
                >
                    Discord
                </p>
            </div>
            <div
                className={css({
                    flex: 1,

                    display: 'grid',
                    gridTemplateRows: '1fr 1fr 1fr',
                    gap: '16px',
                })}
            >
                <Information
                    image={Icons.CommentFilled}
                    title="Chatting"
                    leftText="750"
                    rightText="10,000"
                    progress={750 / 1000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(88, 101, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(88, 101, 242, 0.2)',
                    })}
                />
                <Information
                    image={Icons.Note}
                    title="!Work"
                    leftText="1780"
                    rightText="2000"
                    progress={1780 / 2000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(88, 101, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(88, 101, 242, 0.2)',
                    })}
                />
                <Information
                    image={Icons.CommentOutline}
                    title="Other"
                    leftText="420"
                    rightText="1000"
                    progress={420 / 1000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(88, 101, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(88, 101, 242, 0.2)',
                    })}
                />
            </div>
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '16px',

                    [MOBILE]: {
                        gridTemplateColumns: '1fr',
                    },
                })}
            >
                <StatItem title="Referred Holders" titleClassName={titleClass}>
                    <p
                        className={ClassNameBuilder(
                            textClass,
                            css({
                                color: '#5865F2',
                            })
                        )}
                    >
                        44
                    </p>
                </StatItem>
                <StatItem title="Discord XP Earned" titleClassName={titleClass}>
                    <TokenDisplay className={textClass} amount={8425} />
                </StatItem>
            </div>
        </div>
    );
};

const TwitterEarnings = (): JSX.Element => {
    const [css] = useStyletron();

    const textClass = css({
        fontWeight: 900,
        fontSize: '20px !important',
        lineHeight: '32px',
        letterSpacing: '0.1em !important',
    });

    const titleClass = css({
        fontSize: '12px !important',
        lineHeight: '16px !important',
        letterSpacing: '0.03em !important',
    });

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',

                justifyContent: 'center',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <img
                    src={Icons.TwitterBlue}
                    alt=""
                    className={css({
                        height: '30px',
                        width: 'auto',
                    })}
                />
                <p
                    className={css({
                        fontWeight: 900,
                        fontSize: '18px',
                        lineHeight: '28px',
                    })}
                >
                    Twitter
                </p>
            </div>
            <div
                className={css({
                    flex: 1,
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr 1fr',
                    gap: '16px',
                })}
            >
                <Information
                    image={Icons.Retweet}
                    title="Retweets"
                    leftText="750"
                    rightText="10,000"
                    progress={750 / 1000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(29, 161, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(29, 161, 242, 0.2)',
                    })}
                />
                <Information
                    image={Icons.Heart}
                    title="Likes"
                    leftText="1780"
                    rightText="2000"
                    progress={1780 / 2000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(29, 161, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(29, 161, 242, 0.2)',
                    })}
                />
                <Information
                    image={Icons.CommentOutline}
                    title="Comments"
                    leftText="420"
                    rightText="1000"
                    progress={420 / 1000}
                    progressForegroundClassName={css({
                        backgroundColor: 'rgb(29, 161, 242)',
                    })}
                    progressBackgroundClassName={css({
                        backgroundColor: 'rgba(29, 161, 242, 0.2)',
                    })}
                />
            </div>
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '16px',

                    [MOBILE]: {
                        gridTemplateColumns: '1fr',
                    },
                })}
            >
                <StatItem title="#GACFollowGAC" titleClassName={titleClass}>
                    <p
                        className={ClassNameBuilder(
                            textClass,
                            css({
                                color: 'rgb(29, 161, 242)',
                            })
                        )}
                    >
                        121
                    </p>
                </StatItem>
                <StatItem title="Twitter XP Earned" titleClassName={titleClass}>
                    <TokenDisplay className={textClass} amount={8425} />
                </StatItem>
            </div>
        </div>
    );
};

interface Props {
    comingSoon?: boolean;
}

export const SocialEarnings = ({ comingSoon = true }: Props): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <section
            className={css({
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: theme.backgroundPallette.dark.toRgbaString(),

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',

                [MOBILE]: {
                    padding: '16px',
                },
            })}
        >
            <Header title="Gac social" subtitle="earnings" />
            {comingSoon ? (
                <p
                    className={css({
                        textAlign: 'center',
                        padding: '48px 0',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '28px',
                    })}
                >
                    Coming Soon
                </p>
            ) : (
                <>
                    <p
                        className={css({
                            fontWeight: '500',
                            fontSize: '15px',
                            lineHeight: '22px',

                            wordWrap: 'break-word',
                            overflow: 'hidden',

                            display: '-webkit-box',
                            '-webkit-line-clamp': '2',
                            '-webkit-box-orient': 'vertical',
                        })}
                    >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Minus nam, illo eaque dignissimos eos culpa quasi
                        molestias cumque numquam ut reiciendis, quaerat eligendi
                        quibusdam esse modi ea repellendus cum harum.
                    </p>
                    <div
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            marginTop: '8px',
                            gap: '24px',

                            [MOBILE]: {
                                gridTemplateColumns: '1fr',
                            },
                        })}
                    >
                        <DiscordEarnings />
                        <TwitterEarnings />
                    </div>
                </>
            )}
        </section>
    );
};

export default SocialEarnings;
