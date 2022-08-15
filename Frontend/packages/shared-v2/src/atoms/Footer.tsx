import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import GACLogo from '../assets/png/logo/GAC.png';
import { ClassNameBuilder, MOBILE } from '../utilties';

export interface FooterProps {
    className?: string;
    twitterUrl?: string;
    discordUrl?: string;
    openSeaUrl?: string;
}

export const Footer = (props: FooterProps): JSX.Element => {
    const { className, twitterUrl, discordUrl, openSeaUrl } = props;

    const theme = useThemeContext();
    const [css] = useStyletron();

    return (
        <footer
            className={ClassNameBuilder(
                className,
                css({
                    backgroundColor:
                        theme.backgroundPallette.darker.toRgbaString(),
                    display: 'flex',
                    boxShadow: theme.shadowPallette.rainbow,
                    padding: '35px 40px',
                    alignItems: 'center',
                    fontFamily: theme.font,
                    color: theme.foregroundPallette.white.toRgbaString(),
                    fontWeight: 600,
                    fontSize: '12px',
                    borderRadius: '20px',
                    [MOBILE]: {
                        flexDirection: 'column',
                    },
                })
            )}
        >
            <div
                className={css({
                    flexBasis: '40%',
                    [MOBILE]: { display: 'none' },
                })}
            >
                &copy; {new Date().getFullYear()} Gaming Ape Club, Inc.
            </div>
            <div
                className={css({
                    flexBasis: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    [MOBILE]: {
                        marginBottom: '20px',
                    },
                })}
            >
                <img
                    className={css({ height: '35px', width: 'auto' })}
                    src={GACLogo}
                    alt="Gaming Ape Club"
                />
            </div>
            <div
                className={css({
                    flexBasis: '40%',
                    display: 'flex',
                    justifyContent: 'end',
                    [MOBILE]: {
                        flexWrap: 'wrap',
                    },
                })}
            >
                {!!twitterUrl && (
                    <a
                        href={twitterUrl}
                        className={css({
                            color: theme.foregroundPallette.white.toRgbaString(),
                        })}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                )}
                {!!discordUrl && (
                    <a
                        href={discordUrl}
                        className={css({
                            marginLeft: twitterUrl ? '24px' : undefined,
                            color: theme.foregroundPallette.white.toRgbaString(),
                        })}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Discord
                    </a>
                )}
                {!!openSeaUrl && (
                    <a
                        className={css({
                            marginLeft:
                                twitterUrl || discordUrl ? '24px' : undefined,
                            color: theme.foregroundPallette.white.toRgbaString(),
                        })}
                        href={openSeaUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        OpenSea
                    </a>
                )}
            </div>
            <div
                className={css({
                    display: 'none',
                    marginTop: '32px',
                    [MOBILE]: { display: 'block' },
                })}
            >
                &copy; {new Date().getFullYear()} Gaming Ape Club, Inc.
            </div>
        </footer>
    );
};

export default Footer;
