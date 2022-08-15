import React from 'react';
import { useStyletron } from 'styletron-react';

export const LatestNewsGrid = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            News Header
        </section>
    );
};

export default LatestNewsGrid;
