import React from 'react';
import {
    RequestResult,
    useCustomRpcProvider,
    useGACStakingChildContract,
    useRequest,
} from '@gac/shared-v2';
import { getStakingLastUpdatedTime } from '../Requests';
import {
    useAppConfiguration,
    RPCProviderTag,
} from '../../contexts/AppConfigurationContext';

export const STAKE_LAST_UPDATED_KEY = 'STAKE_LAST_UPDATED';

export const useStakeLastUpdatedTime = (
    user?: string
): RequestResult<number | undefined> => {
    const { GACStakingChildContractAddress } = useAppConfiguration();
    const { web3 } = useCustomRpcProvider(RPCProviderTag.Polygon) ?? {};

    const contract = useGACStakingChildContract(
        web3,
        GACStakingChildContractAddress
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
