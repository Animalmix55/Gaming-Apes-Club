import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { useIERC20Contract } from '@gac/shared-v2/lib/hooks/useContract';
import Web3 from 'web3';
import { getERC20Balance } from '../Requests';

export const ERC20_BALANCE_KEY = 'ERC20_BALANCE';

export const useERC20Balance = (
    user?: string,
    web3?: Web3,
    contractAddress?: string
): RequestResult<BigNumber | undefined> => {
    const contract = useIERC20Contract(web3, contractAddress);
    const request = React.useCallback(
        async (user: string) => {
            if (!contract || !user) return undefined;
            return getERC20Balance(contract, user);
        },
        [contract]
    );

    return useRequest(
        request,
        ERC20_BALANCE_KEY,
        [user, contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};