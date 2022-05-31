import React from 'react';
import {
    RequestResult,
    useGACStakingChildContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { BlockchainReward, getRewardTiers } from '../Requests';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';

export const CURRENT_TIERS_KEY = 'CURRENT_TIERS';

export const useCurrentTiers = (): RequestResult<
    BlockchainReward[] | undefined
> => {
    const { GACStakingChildContractAddress, PolygonChainId } =
        useAppConfiguration();
    const { provider } = useWeb3(PolygonChainId);

    const contract = useGACStakingChildContract(
        provider,
        GACStakingChildContractAddress
    );

    const request = React.useCallback(
        async (user: string) => {
            if (!contract || !user) return undefined;
            return getRewardTiers(contract);
        },
        [contract]
    );

    return useRequest(
        request,
        CURRENT_TIERS_KEY,
        [GACStakingChildContractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
