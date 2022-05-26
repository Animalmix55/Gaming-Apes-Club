/* eslint-disable react/button-has-type */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder, HOVERABLE } from '../utilties';

export enum ButtonType {
    primary,
    secondary,
}

export interface Props {
    text?: string;
    icon?: string;
    iconAlt?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    iconClass?: string;
    themeType?: ButtonType;
    type?: 'button' | 'reset' | 'submit';
}

export const Button = (props: Props): JSX.Element => {
    const {
        text,
        icon,
        iconAlt,
        disabled,
        onClick,
        iconClass,
        className,
        type,
        themeType,
    } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    const buttonClassName = React.useMemo(() => {
        let backgroundColor: string | undefined;
        let hoveredBackgroundColor: string | undefined;
        let disabledBackgroundColor: string | undefined;

        switch (themeType) {
            case ButtonType.primary:
                backgroundColor = theme.buttonPallette.primary.toRgbaString();
                hoveredBackgroundColor =
                    theme.buttonPallette.hovered.toRgbaString();
                disabledBackgroundColor =
                    theme.buttonPallette.disabled.toRgbaString();
                break;
            case ButtonType.secondary:
                backgroundColor = theme.buttonPallette.secondary.toRgbaString();
                hoveredBackgroundColor =
                    theme.buttonPallette.hovered.toRgbaString();
                disabledBackgroundColor =
                    theme.buttonPallette.disabled.toRgbaString();
                break;
            default:
                break;
        }

        return css({
            border: 'unset',
            color: theme.foregroundPallette.white.toRgbaString(),
            fontWeight: 700,
            font: theme.font,
            cursor: disabled ? 'not-allowed' : 'pointer',
            backgroundColor: backgroundColor ?? 'unset',
            fontSize: '14px',
            height: '40px',
            borderRadius: '12px',
            padding: '8px 16px 8px 16px',
            display: 'flex',
            alignItems: 'center',
            ...(!disabled && {
                [HOVERABLE]: {
                    ':hover': {
                        backgroundColor: hoveredBackgroundColor,
                    },
                },
            }),
            ':disabled': {
                backgroundColor: disabledBackgroundColor,
                opacity: 0.6,
            },
        });
    }, [
        css,
        disabled,
        theme.buttonPallette.disabled,
        theme.buttonPallette.hovered,
        theme.buttonPallette.primary,
        theme.buttonPallette.secondary,
        theme.font,
        theme.foregroundPallette.white,
        themeType,
    ]);

    return (
        <button
            className={ClassNameBuilder(className, buttonClassName)}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon && (
                <img
                    src={icon}
                    alt={iconAlt}
                    className={ClassNameBuilder(
                        iconClass,
                        css({
                            height: '20px',
                            width: 'auto',
                            marginRight: text ? '3px' : undefined,
                        })
                    )}
                />
            )}
            {text && <span>{text}</span>}
        </button>
    );
};

export default Button;
