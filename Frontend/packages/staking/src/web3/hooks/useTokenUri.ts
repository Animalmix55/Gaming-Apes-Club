import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { IERC721Metadata } from '@gac/shared-v2/lib/models/IERC721Metadata';
import { getTokenUri } from '../Requests';

export const TOKEN_URI_KEY = 'TOKEN_URI';

export const useTokenUri = (
    tokenId?: string,
    contract?: IERC721Metadata
): RequestResult<string | undefined> => {
    const request = React.useCallback(
        async (tokenId: string) => {
            if (!contract) return undefined;
            return getTokenUri(contract, tokenId);
        },
        [contract]
    );

    return useRequest(
        request,
        TOKEN_URI_KEY,
        [tokenId, contract?.defaultAccount],
        {
            staleTime: Infinity,
        }
    );
};
