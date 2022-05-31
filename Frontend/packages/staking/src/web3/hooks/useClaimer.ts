/* eslint-disable no-alert */
import React from 'react';
import {
    useGACStakingChildContract,
    useMutation,
    useWeb3,
} from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';
import { claimRewards } from '../Requests';
import { CURRENT_REWARD_KEY } from './useCurrentReward';
import { ERC20_BALANCE_KEY } from './useERC20Balance';
import { ERC20_SUPPLY_KEY } from './useERC20Supply';
import { STAKE_LAST_UPDATED_KEY } from './useStakeLastUpdatedTime';

export const useClaimer = (): UseMutationResult<void, unknown, [], unknown> & {
    txHash?: string;
} => {
    const {
        PolygonChainId,
        GACStakingChildContractAddress,
        GACXPContractAddress,
    } = useAppConfiguration();
    const { provider, accounts, requestNewChain } = useWeb3(PolygonChainId);
    const contract = useGACStakingChildContract(
        provider,
        GACStakingChildContractAddress
    );
    const account = accounts?.[0];
    const queryClient = useQueryClient();

    const [txHash, setTxHash] = React.useState<string>();

    const query = React.useCallback(async () => {
        await requestNewChain();
        if (!account) {
            alert('Not connected to a wallet');
            throw new Error('Not connected to a wallet');
        }

        if (!contract) return;
        await claimRewards(contract, account, setTxHash);
    }, [account, contract, requestNewChain]);

    const result = useMutation(query, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CURRENT_REWARD_KEY });
            queryClient.invalidateQueries({ queryKey: STAKE_LAST_UPDATED_KEY });
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

    return { ...result, txHash };
};

export default useClaimer;
