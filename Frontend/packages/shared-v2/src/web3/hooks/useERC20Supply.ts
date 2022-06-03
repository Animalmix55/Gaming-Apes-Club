import React from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { getERC20Supply } from '../Requests';
import { useIERC20Contract } from '../../hooks/useContract';
import { RequestResult, useRequest } from '../../hooks/useRequest';

export const ERC20_SUPPLY_KEY = 'ERC20_SUPPLY';

export const useERC20Supply = (
    provider?: Web3Provider,
    contractAddress?: string
): RequestResult<BigNumber | undefined> => {
    const contract = useIERC20Contract(provider, contractAddress, true);

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
