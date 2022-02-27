import React from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import useHover from '../hooks/useHover';
import ClassNameBuilder from '../utilties/ClassNameBuilder';

export interface GlowButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    round?: boolean;
    forceglow?: boolean;
    children: React.ReactNode;
    innerclass?: string;
}
export const GlowButton = (props: GlowButtonProps): JSX.Element => {
    const { children, className, round, forceglow, innerclass } = props;
    const [hoverRef, hovered] = useHover<HTMLButtonElement>();

    const [css] = useStyletron();
    const theme = useThemeContext();

    const HoverStyles: StyleObject = {
        zIndex: 10,
        position: 'relative',
        display: 'block',
        border: 'unset !important',
        backgroundColor: 'unset',
        padding: '2px',
        cursor: 'pointer',
        fontFamily: `${theme.fonts.title} !important`,
        color: `${theme.fontColors.light.toRgbaString()} !important`,
        fontSize: '0.875rem !important',
        lineHeight: '1.25rem',
        fontWeight: '500',
        ':disabled': {
            cursor: 'not-allowed',
            opacity: '0.7',
        },
        '::before': {
            background: theme.backgroundGradients.purpleBlueButton,
            borderRadius: round ? '100000px' : '4px',
            content: 'no-open-quote',
            position: 'absolute',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px',
            zIndex: -1,
            opacity: hovered || forceglow ? 1 : 0,
            transition: '0.5s ease',
        },
        '::after': {
            background: theme.backgroundGradients.purpleBlueButton,
            borderRadius: round ? '100000px' : '4px',
            content: 'no-open-quote',
            position: 'absolute',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px',
            zIndex: -1,
            opacity: hovered || forceglow ? 1 : 0,
            transition: '0.5s ease',
        },
    };

    const passedProps = { ...props };
    delete passedProps.forceglow;
    delete passedProps.innerclass;
    delete passedProps.round;

    return (
        <button
            type="button"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...passedProps}
            className={ClassNameBuilder(className, css(HoverStyles))}
            ref={hoverRef}
        >
            <div
                className={ClassNameBuilder(
                    innerclass,
                    css({
                        opacity: 0.8,
                        zIndex: 1,
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: `${theme.fontColors.dark.toRgbaString(
                            0.7
                        )} !important`,
                        padding: '2px 16px 0px 16px',
                        boxSizing: 'border-box',
                        borderRadius: round ? '100000px' : '4px',
                    })
                )}
            >
                {children}
            </div>
        </button>
    );
};

export default GlowButton;
