import React from 'react';
import {
    convertToListing,
    ListingForm,
    ServersideListingForm,
} from '../atoms/ListingForm';

export default {
    title: 'Market/Atoms/ListingForm',
    component: ListingForm,
};

export const Local = (): JSX.Element => {
    const [listing, setListing] = React.useState(convertToListing({}));

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ListingForm listing={listing} onChange={setListing} />
        </div>
    );
};

export const Serverside = ({
    listingId,
}: {
    listingId: string;
}): JSX.Element => {
    const [intListingId, setListingId] = React.useState<string | undefined>(
        listingId
    );

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ServersideListingForm
                listingId={intListingId}
                setListingId={setListingId}
            />
        </div>
    );
};

Serverside.args = {
    listingId: '1047bd86-db2f-47b1-978b-4b6a1a543c8e',
};
