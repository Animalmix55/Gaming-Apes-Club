import { Spinner, SpinnerSize } from '@fluentui/react';
import { ClassNameBuilder, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useLogin } from '../api/hooks/useLogin';
import DiscordLogo from '../assets/png/DISCORD.png';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';

export const DiscordLoginButton = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const { login, isLoggingIn } = useLogin();
    const { token } = useAuthorizationContext();

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                })
            )}
        >
            <div
                className={css({
                    fontFamily: theme.fonts.headers,
                    fontWeight: '900',
                    color: theme.fontColors.light.toRgbaString(),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '5px',
                })}
            >
                <img
                    className={css({
                        height: '1.5em',
                        width: 'auto',
                        marginRight: '5px',
                    })}
                    src={DiscordLogo}
                    alt="Discord"
                />
                <div>Discord</div>
            </div>
            <button
                type="button"
                disabled={!!token}
                className={css({
                    backgroundColor: theme.pallette.discordBlue.toRgbaString(),
                    border: '1px solid transparent',
                    borderRadius: '2px',
                    color: theme.fontColors.light.toRgbaString(
                        !token ? 1 : 0.6
                    ),
                    fontFamily: theme.fonts.headers,
                    fontWeight: '900',
                    padding: '0px 8px 0px 8px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    minWidth: '120px',
                    minHeight: '28px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ':hover': {
                        border: `1px solid ${theme.fontColors.light.toRgbaString()}`,
                        backgroundColor:
                            theme.pallette.discordBlue.toRgbaString(0.9),
                    },
                })}
                onClick={login}
            >
                {!isLoggingIn ? (
                    <span>{token ? 'Connected' : 'Connect'}</span>
                ) : (
                    <Spinner size={SpinnerSize.small} />
                )}
            </button>
        </div>
    );
};

export default DiscordLoginButton;
