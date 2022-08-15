import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, GetListingByIdReponse } from '../Requests';

export const ListingKey = 'LISTING';

export const useListing = (
    id?: string
): RequestResult<GetListingByIdReponse> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        async (id?: string) => {
            if (!id) return {};
            if (!api) throw new Error('Missing api');

            return Listing.getById(api, id);
        },
        [api]
    );

    const result = useRequest(queryFn, ListingKey, [id], {
        staleTime: Infinity,
    });

    return result;
};
