import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import {
    RequestResult,
    useIERC721MetadataContract,
    useRequest,
} from '@gac/shared-v2';
import { getTokenUri } from '../Requests';

export const TOKEN_URI_KEY = 'TOKEN_URI';

export const useTokenUri = (
    provider?: Web3Provider,
    tokenId?: string,
    contractAddress?: string
): RequestResult<string | undefined> => {
    const contract = useIERC721MetadataContract(provider, contractAddress);

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
        [tokenId, contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
