import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder } from '../utilties';

export interface HeaderProps {
    title: string;
    subtitle: string;
    className?: string;
}

export const Header = ({
    className,
    title,
    subtitle,
}: HeaderProps): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    userSelect: 'none',
                    fontFamily: theme.font,
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: '28px',
                    textTransform: 'uppercase',
                    color: theme.foregroundPallette.white.toRgbaString(),
                })
            )}
        >
            <div
                className={css({
                    color: theme.foregroundPallette.primary.toRgbaString(),
                })}
            >
                {title}
            </div>
            <div>{subtitle}</div>
        </div>
    );
};

export default Header;
