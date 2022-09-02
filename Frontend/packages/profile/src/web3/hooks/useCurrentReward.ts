import React, { useEffect } from 'react';
import {
    RequestResult,
    useGACStakingChildContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { BigNumber } from '@ethersproject/bignumber';
import { getReward } from '../Requests';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';

export const CURRENT_REWARD_KEY = 'CURRENT_REWARD';

export const useCurrentReward = (
    user?: string
): RequestResult<BigNumber | undefined> => {
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
            return getReward(contract, user);
        },
        [contract]
    );

    return useRequest(
        request,
        CURRENT_REWARD_KEY,
        [user, gacStakingChildContractAddress, !!contract],
        {
            staleTime: Infinity,
        }
    );
};
