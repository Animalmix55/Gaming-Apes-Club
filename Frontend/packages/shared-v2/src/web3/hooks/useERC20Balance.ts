import React from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { getERC20Balance } from '../Requests';
import { useIERC20Contract } from '../../hooks/useContract';
import { RequestResult, useRequest } from '../../hooks/useRequest';

export const ERC20_BALANCE_KEY = 'ERC20_BALANCE';

export const useERC20Balance = (
    user?: string,
    provider?: Web3Provider,
    contractAddress?: string
): RequestResult<BigNumber | undefined> => {
    const contract = useIERC20Contract(provider, contractAddress, true);
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
