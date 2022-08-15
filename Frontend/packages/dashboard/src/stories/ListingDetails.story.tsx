import React from 'react';
import ListingDetails from '../molecules/ListingDetails';

export default {
    title: 'Market/Atoms/ListingDetails',
    component: ListingDetails,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ListingDetails />
        </div>
    );
};
