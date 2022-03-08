import React from 'react';
import { useStyletron } from 'styletron-react';
import { useListings } from '../api/hooks/useListings';
import { ListingGrid } from '../molecules/ListingGrid';

export default {
    title: 'Market/Molecules/ListingGrid',
    component: ListingGrid,
};

export const StandAlone = (): JSX.Element => {
    const [css] = useStyletron();
    const listings = useListings();

    return (
        <div className={css({ backgroundColor: 'black' })}>
            <ListingGrid request={listings} />
        </div>
    );
};
