import React from 'react';
import { useStyletron } from 'styletron-react';
import ClassNameBuilder from '../utilties/ClassNameBuilder';

import Logo from '../assets/png/Text Logo.png';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import GlowButton from '../atoms/GlowButton';

interface Props {
    className?: string;
}

export const Header = (props: Props): JSX.Element => {
    const { className } = props;
    const [css] = useStyletron();
    const { homeUrl } = useGamingApeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    height: '40px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: '42px 42px 0px 42px',
                    display: 'flex',
                })
            )}
        >
            <a
                href={homeUrl}
                className={css({ height: '100%', marginRight: 'auto' })}
            >
                <img
                    className={css({ height: '100%', width: 'auto' })}
                    src={Logo}
                    alt="Gaming Ape Club"
                />
            </a>
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
        </div>
    );
};

export default Header;
