/* eslint-disable no-alert */
import React from 'react';
import {
    ERC20_BALANCE_KEY,
    ERC20_SUPPLY_KEY,
    NFT_BALANCE_KEY,
    TOKENS_HELD_KEY,
    useGACStakingContract,
    useMutation,
    useWeb3,
} from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';
import { stakeTokens } from '../Requests';
import { STAKE_LAST_UPDATED_KEY } from './useStakeLastUpdatedTime';
import { TOKENS_STAKED_KEY } from './useTokensStaked';
import { CURRENT_REWARD_KEY } from './useCurrentReward';

export const useStaker = (): UseMutationResult<
    void,
    unknown,
    [tokens: string[]],
    unknown
> & { txHash?: string } => {
    const {
        EthereumChainId,
        GACStakingContractAddress,
        GamingApeClubAddress,
        GACXPContractAddress,
    } = useAppConfiguration();
    const { provider, accounts, requestNewChain, readonly } =
        useWeb3(EthereumChainId);
    const contract = useGACStakingContract(
        provider,
        GACStakingContractAddress,
        readonly
    );
    const account = accounts?.[0];
    const queryClient = useQueryClient();

    const [txHash, setTxHash] = React.useState<string>();

    const query = React.useCallback(
        async (tokens: string[]) => {
            await requestNewChain();
            if (!account) {
                alert('Not connected to a wallet');
                throw new Error('Not connected to a wallet');
            }

            if (!contract) return;
            await stakeTokens(contract, tokens, account, setTxHash);
        },
        [account, contract, requestNewChain]
    );

    const result = useMutation(query, {
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
            queryClient.invalidateQueries({
                queryKey: [
                    NFT_BALANCE_KEY,
                    account,
                    GamingApeClubAddress,
                    true,
                ],
            });
        },
    });

    return { ...result, txHash };
};

export default useStaker;
