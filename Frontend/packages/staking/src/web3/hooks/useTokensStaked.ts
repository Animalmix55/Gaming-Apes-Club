import React from 'react';
import {
    RequestResult,
    useGamingApeClubContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { getTokensStaked } from '../Requests';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';

export const TOKENS_STAKED_KEY = 'TOKENS_STAKED';

export const useTokensStaked = (address?: string): RequestResult<string[]> => {
    const { GACStakingContractAddres, GamingApeClubAddress } =
        useAppConfiguration();
    const { web3 } = useWeb3();
    const gamingApeClubContract = useGamingApeClubContract(
        web3,
        GamingApeClubAddress
    );

    const request = React.useCallback(
        async (address: string) => {
            if (!gamingApeClubContract || !GACStakingContractAddres || !address)
                return [];
            return getTokensStaked(
                gamingApeClubContract,
                GACStakingContractAddres,
                address
            );
        },
        [GACStakingContractAddres, gamingApeClubContract]
    );

    return useRequest(request, TOKENS_STAKED_KEY, [address], {
        staleTime: Infinity,
    });
};
