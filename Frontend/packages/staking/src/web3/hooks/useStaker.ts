/* eslint-disable no-alert */
import React from 'react';
import { useGACStakingContract, useMutation, useWeb3 } from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';
import { stakeTokens } from '../Requests';
import { STAKE_LAST_UPDATED_KEY } from './useStakeLastUpdatedTime';
import { TOKENS_STAKED_KEY } from './useTokensStaked';
import { CURRENT_REWARD_KEY } from './useCurrentReward';
import { TOKENS_HELD_KEY } from './useTokensHeld';
import { ERC20_BALANCE_KEY } from './useERC20Balance';
import { ERC20_SUPPLY_KEY } from './useERC20Supply';

export const useStaker = (): UseMutationResult<
    void,
    unknown,
    [tokens: string[]],
    unknown
> => {
    const {
        EthereumChainId,
        GACStakingContractAddress,
        GamingApeClubAddress,
        GACXPContractAddress,
    } = useAppConfiguration();
    const { web3, accounts, requestNewChain } = useWeb3(EthereumChainId);
    const contract = useGACStakingContract(web3, GACStakingContractAddress);
    const account = accounts?.[0];
    const queryClient = useQueryClient();

    const query = React.useCallback(
        async (tokens: string[]) => {
            await requestNewChain();
            if (!account) {
                alert('Not connected to a wallet');
                throw new Error('Not connected to a wallet');
            }

            if (!contract) return;
            await stakeTokens(contract, tokens, account);
        },
        [account, contract, requestNewChain]
    );

    return useMutation(query, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: STAKE_LAST_UPDATED_KEY });
            queryClient.invalidateQueries({ queryKey: TOKENS_STAKED_KEY });
            queryClient.invalidateQueries({ queryKey: CURRENT_REWARD_KEY });
            queryClient.invalidateQueries({
                queryKey: [
                    TOKENS_HELD_KEY,
                    account,
                    GamingApeClubAddress,
                    true,
                ],
            });
            queryClient.invalidateQueries({
                queryKey: [
                    ERC20_BALANCE_KEY,
                    account,
                    GACXPContractAddress,
                    true,
                ],
            });
            queryClient.invalidateQueries({
                queryKey: [ERC20_SUPPLY_KEY, GACXPContractAddress, true],
            });
        },
    });
};

export default useStaker;
