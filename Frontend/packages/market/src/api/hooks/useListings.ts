import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, GetListingResponse } from '../Requests';

export const ListingsKey = 'LISTINGS';

export const useListings = (
    offset?: number,
    pageSize?: number,
    showDisabled?: boolean,
    showInactive?: boolean,
    tags?: string[]
): RequestResult<GetListingResponse> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        (
            offset?: number,
            pageSize?: number,
            showDisabled?: boolean,
            showInactive?: boolean,
            tags?: string
        ) => {
            if (!api) throw new Error('Missing api');

            return Listing.getBulk(
                api,
                pageSize,
                offset,
                showDisabled,
                showInactive,
                tags
            );
        },
        [api]
    );

    const mergedTags = tags?.join(',');

    const result = useRequest(
        queryFn,
        ListingsKey,
        [offset, pageSize, showDisabled, showInactive, mergedTags],
        {
            staleTime: Infinity,
        }
    );

    return result;
};
