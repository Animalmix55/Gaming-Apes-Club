import React from 'react';
import { useStyletron } from 'styletron-react';

export const RecentListings = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <section className={css({ color: 'white', background: 'purple' })}>
            Recent Listings
        </section>
    );
};

export default RecentListings;
