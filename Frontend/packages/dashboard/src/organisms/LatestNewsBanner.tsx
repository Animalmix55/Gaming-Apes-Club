import { ClassNameBuilder } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';

interface Props {
    className?: string;
}

export const LatestNewsBanner: React.FC<Props> = ({
    className,
}): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section
            className={ClassNameBuilder(
                className,
                css({ color: 'white', background: 'purple' })
            )}
        >
            Latest News Banner
        </section>
    );
};

export default LatestNewsBanner;
