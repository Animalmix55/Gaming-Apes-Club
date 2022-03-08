import React from 'react';
import { useStyletron } from 'styletron-react';

import Logo from '../assets/png/Text Logo.png';
import { GlowButton } from '../atoms/GlowButton';
import { ClassNameBuilder } from '../utilties';

export interface Props {
    className?: string;
    homeUrl?: string;
    openseaUrl?: string;
    twitterUrl?: string;
    discordUrl?: string;
}

export const Header = (props: Props): JSX.Element => {
    const { className, homeUrl, openseaUrl, twitterUrl, discordUrl } = props;
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    height: '40px',
                    position: 'absolute',
                    zIndex: '1000001', // above layer
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: '42px 42px 0px 42px',
                    display: 'flex',
                    flexWrap: 'wrap',
                })
            )}
        >
            <a
                href={homeUrl}
                className={css({
                    height: '100%',
                    marginRight: 'auto',
                    marginBottom: '10px',
                    marginTop: '10px',
                })}
            >
                <img
                    className={css({ height: '100%', width: 'auto' })}
                    src={Logo}
                    alt="Gaming Ape Club"
                />
            </a>
            <div
                className={css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                {homeUrl && (
                    <div
                        className={css({
                            fontSize: '0.875rem !important',
                            zIndex: 10,
                        })}
                    >
                        <GlowButton
                            onClick={(): void => {
                                window.location.href = homeUrl;
                            }}
                            className={css({ height: '28px' })}
                        >
                            HOME
                        </GlowButton>
                    </div>
                )}
                {openseaUrl && (
                    <div
                        className={css({
                            fontSize: '0.875rem !important',
                            zIndex: 10,
                        })}
                    >
                        <GlowButton
                            onClick={(): void => {
                                window.location.href = openseaUrl;
                            }}
                            className={css({ height: '28px' })}
                        >
                            OPENSEA
                        </GlowButton>
                    </div>
                )}
                {twitterUrl && (
                    <div
                        className={css({
                            fontSize: '0.875rem !important',
                            zIndex: 10,
                        })}
                    >
                        <GlowButton
                            onClick={(): void => {
                                window.location.href = twitterUrl;
                            }}
                            className={css({ height: '28px' })}
                        >
                            TWITTER
                        </GlowButton>
                    </div>
                )}
                {discordUrl && (
                    <div
                        className={css({
                            fontSize: '0.875rem !important',
                            zIndex: 10,
                        })}
                    >
                        <GlowButton
                            onClick={(): void => {
                                window.location.href = discordUrl;
                            }}
                            className={css({ height: '28px' })}
                        >
                            DISCORD
                        </GlowButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
