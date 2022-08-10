import React from 'react';
import { useStyletron } from 'styletron-react';
import { ClassNameBuilder } from '../utilties';
import '../styles/hexagon.css';

export interface HexagonContainerProps {
    className?: string;
    innerClassName?: string;
    children?: React.ReactNode;
    width?: number;
}

export const HexagonContainer = (props: HexagonContainerProps): JSX.Element => {
    const { className, children, width: widthProp, innerClassName } = props;

    const width = widthProp ?? 40;
    const [css] = useStyletron();

    return (
        <div
            className={ClassNameBuilder(
                'hexagon',
                css({
                    height: `${width}px`,
                    width: `${width * 2}px`,
                    margin: `0 0 0 -${width / 10}px`,
                }),
                className
            )}
        >
            <div className="hexagon-in1">
                <div
                    className={ClassNameBuilder('hexagon-in2', innerClassName)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HexagonContainer;
