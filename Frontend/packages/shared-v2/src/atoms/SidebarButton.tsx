/* eslint-disable no-nested-ternary */
import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder, HOVERABLE } from '../utilties';
import { ButtonType } from './Button';

export interface SidebarButtonProps {
    selected?: boolean;
    onClick?: () => void;
    className?: string;
    text: string;
    icon: string;
    iconAlt?: string;
    disabled?: boolean;
    themeType?: ButtonType;
    collapsed?: boolean;
}

export const SidebarButton = (props: SidebarButtonProps): JSX.Element => {
    const {
        selected,
        onClick,
        className,
        text,
        icon,
        iconAlt,
        disabled,
        themeType,
        collapsed,
    } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    const buttonClassName = React.useMemo(() => {
        let hoveredBackgroundColor: string | undefined;
        let disabledBackgroundColor: string | undefined;
        let selectedBackgroundColor: string | undefined;

        switch (themeType) {
            case ButtonType.primary:
                hoveredBackgroundColor =
                    theme.buttonPallette.primary.toRgbaString();
                selectedBackgroundColor =
                    theme.buttonPallette.hovered.toRgbaString();
                disabledBackgroundColor =
                    theme.buttonPallette.disabled.toRgbaString();
                break;
            case ButtonType.secondary:
                hoveredBackgroundColor =
                    theme.buttonPallette.secondary.toRgbaString();
                selectedBackgroundColor =
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
            backgroundColor: selected
                ? selectedBackgroundColor
                : disabled
                ? theme.buttonPallette.disabled.toRgbaString()
                : 'unset',
            fontSize: '15px',
            height: '48px',
            borderRadius: '12px',
            padding: collapsed ? '0px 4px' : '0px 16px 0px 4px',
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
            },
        });
    }, [
        collapsed,
        css,
        disabled,
        selected,
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
            type="button"
        >
            <img
                src={icon}
                alt={iconAlt}
                className={css({
                    height: '90%',
                    width: 'auto',
                    marginRight: collapsed ? undefined : '3px',
                })}
            />
            {!collapsed && <span>{text}</span>}
        </button>
    );
};

export default SidebarButton;
