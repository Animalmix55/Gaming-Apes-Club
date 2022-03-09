import React from 'react';
import { ListingDropdown } from '../atoms/ListingDropdown';

export default {
    title: 'Market/Atoms/ListingDropdown',
    component: ListingDropdown,
};

export const StandAlone = (): JSX.Element => (
    <div
        style={{
            backgroundColor: 'black',
            height: '900px',
            width: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <ListingDropdown />
    </div>
);
