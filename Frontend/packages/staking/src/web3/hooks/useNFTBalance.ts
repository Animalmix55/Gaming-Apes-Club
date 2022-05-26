import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { IERC721Metadata } from '@gac/shared-v2/lib/models/IERC721Metadata';
import { getNFTBalance } from '../Requests';

export const NFT_BALANCE_KEY = 'NFT_BALANCE';

export const useNFTBalance = (
    user?: string,
    contract?: IERC721Metadata
): RequestResult<number | undefined> => {
    const request = React.useCallback(
        async (user: string) => {
            if (!contract) return undefined;
            return getNFTBalance(contract, user);
        },
        [contract]
    );

    return useRequest(request, NFT_BALANCE_KEY, [user], {
        staleTime: Infinity,
    });
};
