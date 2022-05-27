import React from 'react';
import {
    RequestResult,
    useIERC721MetadataContract,
    useRequest,
} from '@gac/shared-v2';
import Web3 from 'web3';
import { getNFTBalance } from '../Requests';

export const NFT_BALANCE_KEY = 'NFT_BALANCE';

export const useNFTBalance = (
    web3?: Web3,
    user?: string,
    contractAddress?: string
): RequestResult<number | undefined> => {
    const contract = useIERC721MetadataContract(web3, contractAddress);

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
