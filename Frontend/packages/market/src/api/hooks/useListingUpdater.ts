import React from 'react';
import { useMutation } from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, ListingPostResponse } from '../Requests';
import { UpdatedListing } from '../Models/Listing';
import { ListingKey } from './useListing';
import { ListingsKey } from './useListings';
import { TagsKey } from './useTags';

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
        onSuccess: async (): Promise<void> => {
            await queryClient.refetchQueries({ queryKey: [ListingKey] });
            await queryClient.refetchQueries({ queryKey: [ListingsKey] });
            await queryClient.refetchQueries({ queryKey: [TagsKey] });
        },
    });
};

export default useListingUpdater;
