import React from 'react';
import {
    RequestResult,
    useGACStakingChildContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { getStakingLastUpdatedTime } from '../Requests';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';

export const STAKE_LAST_UPDATED_KEY = 'STAKE_LAST_UPDATED';

export const useStakeLastUpdatedTime = (
    user?: string
): RequestResult<number | undefined> => {
    const { GACStakingChildContractAddress, PolygonChainId } =
        useAppConfiguration();
    const { provider } = useWeb3(PolygonChainId);

    const contract = useGACStakingChildContract(
        provider,
        GACStakingChildContractAddress,
        true
    );

    const request = React.useCallback(
        async (user: string) => {
            if (!contract || !user) return undefined;
            return getStakingLastUpdatedTime(contract, user);
        },
        [contract]
    );

    return useRequest(
        request,
        STAKE_LAST_UPDATED_KEY,
        [user, GACStakingChildContractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
