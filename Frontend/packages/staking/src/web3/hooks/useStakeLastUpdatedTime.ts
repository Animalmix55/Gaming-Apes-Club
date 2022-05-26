import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { GACStakingChild } from '@gac/shared-v2/lib/models/GACStakingChild';
import { getStakingLastUpdatedTime } from '../Requests';

export const STAKE_LAST_UPDATED_KEY = 'STAKE_LAST_UPDATED';

export const useStakeLastUpdatedTime = (
    user?: string,
    contract?: GACStakingChild
): RequestResult<number | undefined> => {
    const request = React.useCallback(
        async (user: string) => {
            if (!contract) return undefined;
            return getStakingLastUpdatedTime(contract, user);
        },
        [contract]
    );

    return useRequest(request, STAKE_LAST_UPDATED_KEY, [user], {
        staleTime: Infinity,
    });
};
