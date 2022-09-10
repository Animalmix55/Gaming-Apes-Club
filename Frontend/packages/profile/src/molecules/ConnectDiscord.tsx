import React from 'react';
import { useStyletron } from 'styletron-react';
import { Button, ButtonType, Header, Icons, MOBILE } from '@gac/shared-v2';
import XPIconLarge from '../assets/png/xp-icon-large.png';

export const ConnectDiscord = ({
    login,
    isLoggingIn,
}: {
    login: () => void;
    isLoggingIn: boolean;
}): JSX.Element => {
    const [css] = useStyletron();

    return (
        <div
            className={css({
                maxWidth: '555px',
                textAlign: 'center',

                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <div>
                <img
                    src={XPIconLarge}
                    alt="GAC XP"
                    className={css({
                        height: '246px',
                        width: '246px',
                        objectFit: 'contain',
                    })}
                />
            </div>

            <Header
                title="Connect your discord"
                subtitle="And Track your engagement"
                className={css({})}
            />
            <p>
                Connect your Discord to get started.
            </p>
            <Button
                icon={Icons.Discord}
                themeType={ButtonType.primary}
                className={css({
                    [MOBILE]: {
                        flex: '1',
                        textAlign: 'center',
                        marginLeft: 'unset',
                        marginTop: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                })}
                text="Connect Discord"
                onClick={login}
                disabled={isLoggingIn}
            />
        </div>
    );
};

export default ConnectDiscord;
