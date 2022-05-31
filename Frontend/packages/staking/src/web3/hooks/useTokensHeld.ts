import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import {
    RequestResult,
    useIERC721MetadataContract,
    useRequest,
} from '@gac/shared-v2';
import { getTokensHeld } from '../Requests';

export const TOKENS_HELD_KEY = 'TOKENS_HELD';

export const useTokensHeld = (
    provider?: Web3Provider,
    address?: string,
    contractAddress?: string
): RequestResult<string[]> => {
    const contract = useIERC721MetadataContract(provider, contractAddress);

    const request = React.useCallback(
        async (address: string) => {
            if (!address || !contract) return [];
            return getTokensHeld(contract, address);
        },
        [contract]
    );

    return useRequest(
        request,
        TOKENS_HELD_KEY,
        [address, contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
