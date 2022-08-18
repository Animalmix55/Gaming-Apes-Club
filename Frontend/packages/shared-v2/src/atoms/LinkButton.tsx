/* eslint-disable react/button-has-type */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { ThemeContextType, useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder, HOVERABLE } from '../utilties';

export enum LinkButtonType {
    primary,
    secondary,
    error,
}

type ThemeType = {
    backgroundColor: string;
    hoveredBackgroundColor: string;
};

export interface LinkButtonProps {
    text?: string;
    icon?: string;
    iconAlt?: string;
    href: string;
    className?: string;
    iconClass?: string;
    themeType?: LinkButtonType | ThemeType;
}

const getTheme = (
    theme: ThemeContextType,
    type: LinkButtonType | ThemeType
): ThemeType => {
    if (typeof type === 'object') {
        return type;
    }

    switch (type) {
        case LinkButtonType.secondary:
            return {
                backgroundColor: theme.buttonPallette.secondary.toRgbaString(),
                hoveredBackgroundColor:
                    theme.buttonPallette.hovered.toRgbaString(),
            };
        case LinkButtonType.error:
            return {
                backgroundColor: theme.buttonPallette.error.toRgbaString(),
                hoveredBackgroundColor:
                    theme.buttonPallette.error.toRgbaString(),
            };
        default:
        case LinkButtonType.primary:
            return {
                backgroundColor: theme.buttonPallette.primary.toRgbaString(),
                hoveredBackgroundColor:
                    theme.buttonPallette.hovered.toRgbaString(),
            };
    }
};

export const LinkButton = ({
    text,
    icon,
    iconAlt,
    href,
    iconClass,
    className,
    themeType = LinkButtonType.secondary,
}: LinkButtonProps): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const buttonClassName = React.useMemo(() => {
        const { backgroundColor, hoveredBackgroundColor } = getTheme(
            theme,
            themeType
        );

        return css({
            border: 'unset',
            color: theme.foregroundPallette.white.toRgbaString(),
            fontWeight: 700,
            fontFamily: theme.font,
            cursor: 'pointer',
            backgroundColor: backgroundColor ?? 'unset',
            fontSize: '14px',
            height: '40px',
            borderRadius: '12px',
            padding: '8px 16px 8px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',

            [HOVERABLE]: {
                ':hover, :focus': {
                    backgroundColor: hoveredBackgroundColor,
                },
            },
        });
    }, [css, theme, themeType]);

    return (
        <a href={href} className={ClassNameBuilder(className, buttonClassName)}>
            {icon && (
                <img
                    src={icon}
                    alt={iconAlt}
                    className={ClassNameBuilder(
                        iconClass,
                        css({
                            height: '20px',
                            width: 'auto',
                        })
                    )}
                />
            )}
            {text && <span>{text}</span>}
        </a>
    );
};

export default LinkButton;
