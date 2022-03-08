/* eslint-disable no-void */
import React from 'react';
import { useListing } from '../api/hooks/useListing';
import { ListingWithCount } from '../api/Models/Listing';
import { ListingModal } from '../molecules/ListingModal';

export default {
    title: 'Market/Molecules/ListingModal',
    component: ListingModal,
};

export const StandAlone = (props: { listingId: string }): JSX.Element => {
    const { listingId } = props;
    const { data: listing } = useListing(listingId);

    if (!listing) return <div>Loading...</div>;

    // eslint-disable-next-line no-void
    return (
        <ListingModal
            listing={{ ...listing, totalPurchased: 0 } as ListingWithCount}
            onClose={(): void => void 0}
        />
    );
};

StandAlone.args = {
    listingId: '1047bd86-db2f-47b1-978b-4b6a1a543c8e',
};
