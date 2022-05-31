import React from 'react';
import {
    RequestResult,
    useGACStakingChildContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { getReward } from '../Requests';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';

export const CURRENT_REWARD_KEY = 'CURRENT_REWARD';

export const useCurrentReward = (
    user?: string
): RequestResult<BigNumber | undefined> => {
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
            return getReward(contract, user);
        },
        [contract]
    );

    return useRequest(
        request,
        CURRENT_REWARD_KEY,
        [user, GACStakingChildContractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
