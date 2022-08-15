import React from 'react';
import { useStyletron } from 'styletron-react';

export const Partners = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            Partners
        </section>
    );
};

export default Partners;
