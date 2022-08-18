import { ClassNameBuilder, MOBILE } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    className?: string;
    heading: React.ReactElement;
    action?: React.ReactElement;
}

const GridLayouts = {
    desktop: {
        withAction: {
            gridTemplateAreas: '"header action" "main main"',
            gridTemplateColumns: 'auto max-content',
        },
        withoutAction: {
            gridTemplateAreas: '"header" "main"',
            gridTemplateColumns: '1fr',
        },
    },
    mobile: {
        withAction: {
            gridTemplateAreas: '"header" "main" "action"',
            gridTemplateColumns: '1fr',
        },
        withoutAction: {
            gridTemplateAreas: '"header" "main"',
            gridTemplateColumns: '1fr',
        },
    },
};

const DashboardSection: React.FC<Props> = ({
    heading,
    action,
    children,
    className,
}): JSX.Element => {
    const [css] = useStyletron();
    const hasAction = !!action;

    return (
        <section
            className={ClassNameBuilder(
                className,
                css({
                    display: 'grid',
                    alignItems: 'center',
                    columnGap: '8px',
                    ...(hasAction
                        ? GridLayouts.desktop.withAction
                        : GridLayouts.desktop.withoutAction),

                    [MOBILE]: {
                        columnGap: 'unset',

                        ...(hasAction
                            ? GridLayouts.mobile.withAction
                            : GridLayouts.mobile.withoutAction),
                    },
                })
            )}
        >
            <div
                className={css({
                    gridArea: 'header',
                })}
            >
                {heading}
            </div>
            {action && (
                <div
                    className={css({
                        gridArea: 'action',
                        justifySelf: 'end',
                        [MOBILE]: {
                            justifySelf: 'center',
                        },
                    })}
                >
                    {action}
                </div>
            )}
            <div
                className={css({
                    gridArea: 'main',
                })}
            >
                {children}
            </div>
        </section>
    );
};

export default DashboardSection;
