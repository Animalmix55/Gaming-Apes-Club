import React from 'react';
import {
    RequestResult,
    useCustomRpcProvider,
    useGACStakingChildContract,
    useRequest,
} from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { getReward } from '../Requests';
import {
    RPCProviderTag,
    useAppConfiguration,
} from '../../contexts/AppConfigurationContext';

export const CURRENT_REWARD_KEY = 'CURRENT_REWARD';

export const useCurrentReward = (
    user?: string
): RequestResult<BigNumber | undefined> => {
    const { GACStakingChildContractAddress } = useAppConfiguration();
    const { web3 } = useCustomRpcProvider(RPCProviderTag.Polygon) ?? {};

    const contract = useGACStakingChildContract(
        web3,
        GACStakingChildContractAddress
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
