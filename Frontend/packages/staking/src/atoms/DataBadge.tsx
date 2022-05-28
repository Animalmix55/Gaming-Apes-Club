import React from 'react';
import {
    ClassNameBuilder,
    Icons,
    ThemeContextType,
    useThemeContext,
} from '@gac/shared-v2';
import { StyleObject, useStyletron } from 'styletron-react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { BigNumber } from '@ethersproject/bignumber';

export interface DataBadgeProps {
    className?: string;
    topText: string;
    isLoading?: boolean;
    lowerElement: React.ReactNode;
}

export const AccentTextStyles = (theme: ThemeContextType): StyleObject => ({
    color: theme.foregroundPallette.accent.toRgbaString(),
    fontFamily: theme.font,
    fontWeight: 900,
    fontSize: '14px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    overflow: 'hidden',
});

export const Fraction = ({
    left,
    right,
    leftClassName,
    rightClassName,
    slashClassName,
    className,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
    leftClassName?: string;
    rightClassName?: string;
    slashClassName?: string;
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div className={className}>
            <span className={leftClassName}>{left}</span>
            <span
                className={ClassNameBuilder(
                    slashClassName,
                    css({
                        margin: '0px 8px',
                        fontWeight: 700,
                        fontSize: '10px',
                        color: theme.foregroundPallette.white.toRgbaString(),
                    })
                )}
            >
                /
            </span>
            <span className={rightClassName}>{right}</span>
        </div>
    );
};

export const Divider = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                height: '100%',
                width: '1px',
                margin: '0px 16px',
                backgroundColor: theme.foregroundPallette.white.toRgbaString(),
                opacity: 0.1,
            })}
        />
    );
};

export const TokenDisplay = ({
    amount,
}: {
    amount?: BigNumber;
}): JSX.Element => {
    const number = amount?.div(String(1e18)).toString() ?? 0;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <span className={css(AccentTextStyles(theme))}>{number}</span>
            <img
                src={Icons.GACXP}
                className={css({
                    height: '19px',
                    width: 'auto',
                    marginLeft: '4px',
                })}
                alt="GACXP"
            />
        </div>
    );
};

export const DataBadge = (props: DataBadgeProps): JSX.Element => {
    const { className, isLoading, topText, lowerElement } = props;
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div className={className}>
            {!isLoading && (
                <>
                    <div
                        className={css({
                            fontFamily: theme.font,
                            color: theme.foregroundPallette.white.toRgbaString(),
                            fontWeight: 700,
                            fontSize: '10px',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                        })}
                    >
                        {topText}
                    </div>
                    <div>{lowerElement}</div>
                </>
            )}
            {!!isLoading && (
                <div
                    className={css({
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <Spinner size={SpinnerSize.medium} />
                </div>
            )}
        </div>
    );
};

export default DataBadge;
