import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { GACXP } from '@gac/shared-v2/lib/models/GACXP';
import { getERC20Balance } from '../Requests';

export const ERC20_BALANCE_KEY = 'ERC20_BALANCE';

export const useCurrentReward = (
    user?: string,
    contract?: GACXP
): RequestResult<BigNumber | undefined> => {
    const request = React.useCallback(
        async (user: string) => {
            if (!contract) return undefined;
            return getERC20Balance(contract, user);
        },
        [contract]
    );

    return useRequest(request, ERC20_BALANCE_KEY, [user], {
        staleTime: Infinity,
    });
};
