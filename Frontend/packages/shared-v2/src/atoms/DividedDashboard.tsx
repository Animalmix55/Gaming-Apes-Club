import React from 'react';
import { useStyletron } from 'styletron-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { ClassNameBuilder, MOBILE } from '../utilties';
import { Divider } from './DataBadge';

export interface DividedDashboardProps {
    className?: string;
    children: React.ReactNode[];
    rightItem?: React.ReactNode;
}

export const DividedDashboard = (props: DividedDashboardProps): JSX.Element => {
    const { className, children, rightItem } = props;

    const [css] = useStyletron();
    const theme = useThemeContext();
    const bodyClass = ClassNameBuilder(
        className,
        css({
            borderRadius: '20px',
            width: 'fit-content',
            backgroundColor: theme.backgroundPallette.light.toRgbaString(),
            color: theme.foregroundPallette.white.toRgbaString(),
            fontFamily: theme.font,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            [MOBILE]: {
                justifyContent: 'center',
                flexWrap: 'wrap',
            },
        })
    );

    return (
        <div className={bodyClass}>
            {children.map((c, i) => {
                if (i === 0) return c;
                return (
                    <>
                        <Divider />
                        {c}
                    </>
                );
            })}
            {rightItem && (
                <div className={css({ marginLeft: '36px' })}>{rightItem}</div>
            )}
        </div>
    );
};

export default DividedDashboard;
