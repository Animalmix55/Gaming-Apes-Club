import { ClassNameBuilder, useThemeContext } from '@gac/shared';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { BigNumber } from '@ethersproject/bignumber';
import XPIcon from '../assets/png/GAC_XP_ICON.png';

export const LocalBalanceWidget = (props: {
    className?: string;
    isLoading?: boolean;
    balance?: BigNumber | number;
    additionalContent?: JSX.Element;
}): JSX.Element => {
    const { className, isLoading, balance, additionalContent } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

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
                    {typeof balance === 'number'
                        ? balance
                        : balance.div(String(10 ** 18)).toLocaleString()}
                </div>
            )}
            {additionalContent}
        </div>
    );
};

export default LocalBalanceWidget;
