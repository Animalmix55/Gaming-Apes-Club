import { Spinner, SpinnerSize } from '@fluentui/react';
import { ClassNameBuilder, useThemeContext } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

const Heading = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}): JSX.Element => {
    const [css] = useStyletron();
    return (
        <p
            className={ClassNameBuilder(
                css({
                    fontWeight: 900,
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0.03em',
                }),
                className
            )}
        >
            {text}
        </p>
    );
};

interface Props {
    title: string;
    loading?: boolean;
    titleClassName?: string;
}

const StatItem: React.FC<Props> = ({
    children,
    title,
    loading,
    titleClassName,
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    return (
        <div
            className={css({
                backgroundColor: theme.backgroundPallette.light.toRgbaString(),
                padding: '16px',
                borderRadius: '20px',
                textAlign: 'center',

                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
            })}
        >
            <Heading text={title} className={titleClassName} />
            <div
                className={css({
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                })}
            >
                {loading ? <Spinner size={SpinnerSize.medium} /> : children}
            </div>
        </div>
    );
};

export default StatItem;
