import React from 'react';
import {
    RequestResult,
    useIERC721MetadataContract,
    useRequest,
} from '@gac/shared-v2';
import Web3 from 'web3';
import { getTokenUri } from '../Requests';

export const TOKEN_URI_KEY = 'TOKEN_URI';

export const useTokenUri = (
    web3?: Web3,
    tokenId?: string,
    contractAddress?: string
): RequestResult<string | undefined> => {
    const contract = useIERC721MetadataContract(web3, contractAddress);

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
