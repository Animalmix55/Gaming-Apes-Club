import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { getTokensHeld } from '../Requests';
import { useIERC721MetadataContract } from '../../hooks/useContract';
import { RequestResult, useRequest } from '../../hooks/useRequest';

export const TOKENS_HELD_KEY = 'TOKENS_HELD';

export const useTokensHeld = (
    provider?: Web3Provider,
    address?: string,
    contractAddress?: string
): RequestResult<string[]> => {
    const contract = useIERC721MetadataContract(
        provider,
        contractAddress,
        true
    );

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
