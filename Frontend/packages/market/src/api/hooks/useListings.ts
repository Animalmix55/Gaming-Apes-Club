import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, GetListingResponse } from '../Requests';

export const ListingsKey = 'LISTINGS';

export const useListings = (
    offset?: number,
    pageSize?: number,
    showDisabled?: boolean
): RequestResult<GetListingResponse> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        (offset?: number, pageSize?: number, showDisabled?: boolean) => {
            if (!api) throw new Error('Missing api');

            return Listing.getBulk(api, pageSize, offset, showDisabled);
        },
        [api]
    );

    const result = useRequest(
        queryFn,
        ListingsKey,
        [offset, pageSize, showDisabled],
        {
            staleTime: Infinity,
        }
    );

    return result;
};
