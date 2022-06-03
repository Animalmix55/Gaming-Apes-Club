import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { getNFTBalance } from '../Requests';
import { useIERC721MetadataContract } from '../../hooks/useContract';
import { RequestResult, useRequest } from '../../hooks/useRequest';

export const NFT_BALANCE_KEY = 'NFT_BALANCE';

export const useNFTBalance = (
    provider?: Web3Provider,
    user?: string,
    contractAddress?: string
): RequestResult<number | undefined> => {
    const contract = useIERC721MetadataContract(
        provider,
        contractAddress,
        true
    );

    const request = React.useCallback(
        async (user: string) => {
            if (!contract || !user) return undefined;
            return getNFTBalance(contract, user);
        },
        [contract]
    );

    return useRequest(
        request,
        NFT_BALANCE_KEY,
        [user, contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
