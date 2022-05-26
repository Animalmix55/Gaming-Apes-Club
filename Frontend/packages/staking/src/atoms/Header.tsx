import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

export const Header = ({ className }: { className?: string }): JSX.Element => {
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
                Gaming Ape Club&apos;s
            </div>
            <div>Staking Hub</div>
        </div>
    );
};

export default Header;
