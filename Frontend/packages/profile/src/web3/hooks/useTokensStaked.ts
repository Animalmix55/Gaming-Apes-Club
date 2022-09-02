import React from 'react';
import {
    RequestResult,
    useGamingApeClubContract,
    useRequest,
    useWeb3,
} from '@gac/shared-v2';
import { getTokensStaked } from '../Requests';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';

export const TOKENS_STAKED_KEY = 'TOKENS_STAKED';

export const useTokensStaked = (address?: string): RequestResult<string[]> => {
    const { gacStakingContractAddress, gamingApeClubAddress, ethereumChainId } =
        useGamingApeContext();
    const { provider } = useWeb3(ethereumChainId);
    const gamingApeClubContract = useGamingApeClubContract(
        provider,
        gamingApeClubAddress,
        true
    );

    const request = React.useCallback(
        async (address: string) => {
            if (
                !gamingApeClubContract ||
                !gacStakingContractAddress ||
                !address
            )
                return [];
            return getTokensStaked(
                gamingApeClubContract,
                gacStakingContractAddress,
                address
            );
        },
        [gacStakingContractAddress, gamingApeClubContract]
    );

    return useRequest(
        request,
        TOKENS_STAKED_KEY,
        [address, gacStakingContractAddress, !!gamingApeClubContract],
        {
            staleTime: Infinity,
        }
    );
};
