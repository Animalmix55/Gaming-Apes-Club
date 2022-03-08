import React from 'react';
import { useMutation } from '@gac/shared';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Listing, ListingPostResponse } from '../Requests';
import { NewListing } from '../Models/Listing';

export const useListingCreator = (): UseMutationResult<
    ListingPostResponse,
    unknown,
    [listing: NewListing],
    unknown
> => {
    const { token } = useAuthorizationContext();
    const { api } = useGamingApeContext();
    const queryClient = useQueryClient();

    const query = React.useCallback(
        async (listing: NewListing) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');

            return Listing.create(api, token, listing);
        },
        [api, token]
    );

    return useMutation(query, {
        onSuccess: async (): Promise<void> => {
            await queryClient.refetchQueries();
        },
    });
};

export default useListingCreator;
