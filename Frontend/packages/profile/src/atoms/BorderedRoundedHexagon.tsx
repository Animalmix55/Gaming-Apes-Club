import { ClassNameBuilder, RoundedHexagon } from '@gac/shared-v2';
import React, { useMemo } from 'react';
import { useStyletron } from 'styletron-react';

export interface Props {
    id: string;
    className?: string;
    radius?: number;
    width?: number;
    borderWidth?: number;
    borderClassName?: string;
}

export const BorderedRoundedHexagon: React.FC<Props> = ({
    id,
    children,
    className,
    borderClassName,
    radius = 10,
    width = 264,
    borderWidth = 5,
}): JSX.Element => {
    const [css] = useStyletron();

    const [borderRadius, borderFullWidth] = useMemo(() => {
        const fullWidth = width + borderWidth * 2;
        const borderRadius = fullWidth * (radius / width);
        return [borderRadius, fullWidth];
    }, [borderWidth, radius, width]);

    return (
        <RoundedHexagon
            className={ClassNameBuilder(
                css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }),
                borderClassName
            )}
            id={`${id}-border`}
            radius={borderRadius}
            width={borderFullWidth}
        >
            <RoundedHexagon
                id={id}
                className={className}
                radius={radius}
                width={width}
            >
                {children}
            </RoundedHexagon>
        </RoundedHexagon>
    );
};

export default BorderedRoundedHexagon;
