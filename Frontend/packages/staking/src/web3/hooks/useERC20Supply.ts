import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { GACXP } from '@gac/shared-v2/lib/models/GACXP';
import { getERC20Supply } from '../Requests';

export const ERC20_SUPPLY_KEY = 'ERC20_SUPPLY';

export const useERC20Supply = (
    contract?: GACXP
): RequestResult<BigNumber | undefined> => {
    const request = React.useCallback(async () => {
        if (!contract) return undefined;
        return getERC20Supply(contract);
    }, [contract]);

    return useRequest(request, ERC20_SUPPLY_KEY, [contract?.defaultAccount], {
        staleTime: Infinity,
    });
};
