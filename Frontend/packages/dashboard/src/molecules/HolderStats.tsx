import React from 'react';
import { useStyletron } from 'styletron-react';

export const HolderStats = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            Holder Stats
        </section>
    );
};

export default HolderStats;
