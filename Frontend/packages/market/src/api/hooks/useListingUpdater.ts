import React from 'react';
import { useMutation } from '@gac/shared';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, ListingPostResponse } from '../Requests';
import { UpdatedListing } from '../Models/Listing';
import { ListingsKey } from './useListings';

export const useListingUpdater = (): UseMutationResult<
    ListingPostResponse,
    unknown,
    [listing: UpdatedListing],
    unknown
> => {
    const { token } = useAuthorizationContext();
    const { api } = useGamingApeContext();
    const queryClient = useQueryClient();

    const query = React.useCallback(
        async (listing: UpdatedListing) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');

            return Listing.update(api, token, listing);
        },
        [api, token]
    );

    return useMutation(query, {
        onSuccess: (): void => {
            queryClient.invalidateQueries({
                queryKey: [ListingsKey],
                exact: false,
            });
        },
    });
};

export default useListingUpdater;
