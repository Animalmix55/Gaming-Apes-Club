/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useStyletron } from 'styletron-react';

import Logo from '../assets/png/Text Logo.png';
import { GlowButton } from '../atoms/GlowButton';
import { ClassNameBuilder } from '../utilties';

export interface HeaderButtonProps {
    displayText: string;
    onClick: () => void;
}

export interface Props {
    className?: string;
    homeUrl?: string;
    openseaUrl?: string;
    twitterUrl?: string;
    discordUrl?: string;
    additionalButtons?: HeaderButtonProps[];
}

const HeaderButton = (props: HeaderButtonProps): JSX.Element => {
    const { onClick, displayText } = props;
    const [css] = useStyletron();

    return (
        <div
            className={css({
                fontSize: '0.875rem !important',
                zIndex: 10,
            })}
        >
            <GlowButton onClick={onClick} className={css({ height: '28px' })}>
                {displayText}
            </GlowButton>
        </div>
    );
};

export const Header = (props: Props): JSX.Element => {
    const {
        className,
        homeUrl,
        openseaUrl,
        twitterUrl,
        discordUrl,
        additionalButtons,
    } = props;
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    position: 'absolute',
                    zIndex: '1000001', // above layer
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: '42px 42px 0px 42px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                })
            )}
        >
            <a
                href={homeUrl}
                className={css({
                    height: '40px',
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
                    <HeaderButton
                        onClick={(): void => {
                            window.location.href = homeUrl;
                        }}
                        displayText="HOME"
                    />
                )}
                {openseaUrl && (
                    <HeaderButton
                        onClick={(): void => {
                            window.open(openseaUrl, '_blank');
                        }}
                        displayText="OPENSEA"
                    />
                )}
                {twitterUrl && (
                    <HeaderButton
                        onClick={(): void => {
                            window.open(twitterUrl, '_blank');
                        }}
                        displayText="TWITTER"
                    />
                )}
                {discordUrl && (
                    <HeaderButton
                        onClick={(): void => {
                            window.open(discordUrl, '_blank');
                        }}
                        displayText="DISCORD"
                    />
                )}
                {!!additionalButtons &&
                    additionalButtons.map((b) => (
                        <HeaderButton key={b.displayText} {...b} />
                    ))}
            </div>
        </div>
    );
};

export default Header;
