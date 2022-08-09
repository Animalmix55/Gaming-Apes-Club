import React from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';

export interface BadgeProps {
    color: StyleObject['color'];
    textColor: StyleObject['color'];
    text: string;
    className?: string;
}

export const Badge = (props: BadgeProps): JSX.Element => {
    const { color, text, className, textColor } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    backgroundColor: color,
                    color: textColor,
                    fontFamily: theme.font,
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 8px',
                    boxSizing: 'border-box',
                    width: 'fit-content',
                    borderRadius: '8px',
                })
            )}
        >
            {text}
        </div>
    );
};

export default Badge;
