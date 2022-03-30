import { ClassNameBuilder, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useBalance } from '../api/hooks/useBalance';
import { useAuthorizationContext } from '../contexts/AuthorizationContext';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

export const BalanceWidget = ({
    className,
}: {
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { claims } = useAuthorizationContext();
    const discordId = claims?.id;

    const { data: balance, isLoading } = useBalance(discordId);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    border: `4px solid ${theme.fontColors.light.toRgbaString()}`,
                    fontFamily: theme.fonts.headers,
                    fontWeight: '900',
                    color: theme.fontColors.light.toRgbaString(),
                    padding: '8px',
                    fontSize: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '150px',
                })
            )}
        >
            <img
                alt="XP"
                src={XPIcon}
                className={css({
                    height: '40px',
                    width: 'auto',
                    marginRight: '5px',
                })}
            />
            {isLoading && <Spinner size={SpinnerSize.medium} />}
            {balance !== undefined && (
                <div className={css({ font: 'inherit' })}>
                    {balance.toLocaleString()}
                </div>
            )}
        </div>
    );
};

export default BalanceWidget;
