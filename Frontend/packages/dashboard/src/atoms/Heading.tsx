/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    highlightedTitle: string;
    title: string;
    className?: string;
}

const Heading: React.FC<Props> = ({
    highlightedTitle,
    title,
    className,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <h2
            className={ClassNameBuilder(
                className,
                css({
                    display: 'flex',
                    flexDirection: 'column',

                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: '28px',
                    lineHeight: '28px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: theme.foregroundPallette.white.toRgbaString(),
                })
            )}
        >
            <span
                className={css({
                    color: theme.foregroundPallette.primary.toRgbaString(),
                })}
            >
                {highlightedTitle}
            </span>
            <span>{title}</span>
        </h2>
    );
};

export default Heading;