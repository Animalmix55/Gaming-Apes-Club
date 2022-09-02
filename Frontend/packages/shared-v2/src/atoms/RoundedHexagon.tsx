import React from 'react';
import { useStyletron } from 'styletron-react';
import { ClassNameBuilder } from '../utilties';

export interface RoundedHexagonProps {
    id: string;
    className?: string;
    radius?: number;
    width?: number;
}

export const RoundedHexagon: React.FC<RoundedHexagonProps> = ({
    id,
    children,
    className,
    radius = 10,
    width = 264,
}): JSX.Element => {
    const [css] = useStyletron();
    const filterId = `round-${id}`;

    return (
        <>
            <svg
                style={{ visibility: 'hidden', position: 'absolute' }}
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation={radius}
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className={css({
                    filter: `url(#${filterId})`,
                })}
            >
                <div
                    className={ClassNameBuilder(
                        css({
                            position: 'relative',
                            width: `${width}px`,
                            aspectRatio: '1000 / 866',
                            clipPath:
                                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                            overflow: 'hidden',
                        }),
                        className
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default RoundedHexagon;
