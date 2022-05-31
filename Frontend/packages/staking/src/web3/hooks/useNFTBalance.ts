import React from 'react';
import {
    RequestResult,
    useIERC721MetadataContract,
    useRequest,
} from '@gac/shared-v2';
import { Web3Provider } from '@ethersproject/providers';
import { getNFTBalance } from '../Requests';

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
