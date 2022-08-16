import React from 'react';
import { useStyletron } from 'styletron-react';

export const ShackSpecials = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            Shack Specials
        </section>
    );
};

export default ShackSpecials;
