import React from 'react';
import {
    RequestResult,
    useGACStakingChildContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { BlockchainReward, getRewardTiers } from '../Requests';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';

export const CURRENT_TIERS_KEY = 'CURRENT_TIERS';

export const useCurrentTiers = (): RequestResult<
    BlockchainReward[] | undefined
> => {
    const { gacStakingChildContractAddress, polygonChainId } =
        useGamingApeContext();
    const { provider } = useWeb3(polygonChainId);

    const contract = useGACStakingChildContract(
        provider,
        gacStakingChildContractAddress,
        true
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
        [gacStakingChildContractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
