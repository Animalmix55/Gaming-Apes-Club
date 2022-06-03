import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { isApprovedForAll } from '../Requests';
import { useIERC721MetadataContract } from '../../hooks/useContract';
import { RequestResult, useRequest } from '../../hooks/useRequest';

export const ERC721_IS_APPROVED_FOR_ALL_KEY = 'ERC721_IS_APPROVED_FOR_ALL';

export const useIsApprovedForAll = (
    provider?: Web3Provider,
    contractAddress?: string,
    owner?: string,
    operator?: string
): RequestResult<boolean> => {
    const contract = useIERC721MetadataContract(
        provider,
        contractAddress,
        true
    );

    const request = React.useCallback(
        async (owner?: string, operator?: string) => {
            if (!contract || !owner || !operator) return false;
            return isApprovedForAll(contract, owner, operator);
        },
        [contract]
    );

    return useRequest(
        request,
        ERC721_IS_APPROVED_FOR_ALL_KEY,
        [owner, operator, contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
