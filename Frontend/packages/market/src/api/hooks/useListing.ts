import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, TransactionGetResponse } from '../Requests';

export const ListingKey = 'LISTING';

export const useListings = (
    id: string
): RequestResult<TransactionGetResponse> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        (id: string) => {
            if (!api) throw new Error('Missing api');

            return Listing.getById(api, id);
        },
        [api]
    );

    const result = useRequest(queryFn, ListingKey, [id]);

    return result;
};
