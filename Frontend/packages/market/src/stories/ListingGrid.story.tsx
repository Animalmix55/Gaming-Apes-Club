import React from 'react';
import { useStyletron } from 'styletron-react';
import { ListingGrid } from '../molecules/ListingGrid';

export default {
    title: 'Market/Molecules/ListingGrid',
    component: ListingGrid,
};

export const StandAlone = (): JSX.Element => {
    const [css] = useStyletron();

    return (
        <div className={css({ backgroundColor: 'black' })}>
            <ListingGrid />
        </div>
    );
};
