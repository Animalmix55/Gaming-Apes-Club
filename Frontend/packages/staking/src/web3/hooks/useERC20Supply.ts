import React from 'react';
import { RequestResult, useIERC20Contract, useRequest } from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { getERC20Supply } from '../Requests';

export const ERC20_SUPPLY_KEY = 'ERC20_SUPPLY';

export const useERC20Supply = (
    provider?: Web3Provider,
    contractAddress?: string
): RequestResult<BigNumber | undefined> => {
    const contract = useIERC20Contract(provider, contractAddress);

    const request = React.useCallback(async () => {
        if (!contract) return undefined;
        return getERC20Supply(contract);
    }, [contract]);

    return useRequest(
        request,
        ERC20_SUPPLY_KEY,
        [contractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
