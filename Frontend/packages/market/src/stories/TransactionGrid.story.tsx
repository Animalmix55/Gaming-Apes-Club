import React from 'react';
import { ListingDropdown } from '../atoms/ListingDropdown';
import { TransactionGrid } from '../atoms/TransactionGrid';
import { AuthorizationContext } from '../contexts/AuthorizationContext';

export default {
    title: 'Market/Atoms/TransactionGrid',
    component: TransactionGrid,
};

export const StandAlone = ({ token }: { token?: string }): JSX.Element => {
    const [listingId, setListingId] = React.useState<string>();

    return (
        <div>
            <AuthorizationContext.Provider
                value={{ token, onLogin: (): string => '' }}
            >
                <ListingDropdown
                    onSelect={setListingId}
                    selectedKey={listingId}
                />
                <div style={{ height: '500px', width: '600px' }}>
                    <TransactionGrid listingId={listingId} />
                </div>
            </AuthorizationContext.Provider>
        </div>
    );
};

StandAlone.args = {
    token: '',
};
