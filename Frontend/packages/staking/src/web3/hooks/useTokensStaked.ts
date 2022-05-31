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
    const { GACStakingContractAddress, GamingApeClubAddress, EthereumChainId } =
        useAppConfiguration();
    const { provider } = useWeb3(EthereumChainId);
    const gamingApeClubContract = useGamingApeClubContract(
        provider,
        GamingApeClubAddress
    );

    const request = React.useCallback(
        async (address: string) => {
            if (
                !gamingApeClubContract ||
                !GACStakingContractAddress ||
                !address
            )
                return [];
            return getTokensStaked(
                gamingApeClubContract,
                GACStakingContractAddress,
                address
            );
        },
        [GACStakingContractAddress, gamingApeClubContract]
    );

    return useRequest(
        request,
        TOKENS_STAKED_KEY,
        [address, GACStakingContractAddress, !!gamingApeClubContract],
        {
            staleTime: Infinity,
        }
    );
};
