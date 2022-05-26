import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { GACStakingChild } from '@gac/shared-v2/lib/models/GACStakingChild';
import { BigNumber } from '@ethersproject/bignumber';
import { getReward } from '../Requests';

export const CURRENT_REWARD_KEY = 'CURRENT_REWARD';

export const useCurrentReward = (
    user?: string,
    contract?: GACStakingChild
): RequestResult<BigNumber | undefined> => {
    const request = React.useCallback(
        async (user: string) => {
            if (!contract) return undefined;
            return getReward(contract, user);
        },
        [contract]
    );

    return useRequest(request, CURRENT_REWARD_KEY, [user], {
        staleTime: Infinity,
    });
};
