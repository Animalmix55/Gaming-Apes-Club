import { BigNumber } from '@ethersproject/bignumber';
import { RequestResult } from '@gac/shared-v2';
import React from 'react';
import { BlockchainReward } from '../Requests';
import { useCurrentTiers } from './useCurrentTiers';

export type RewardByAmountResponse = {
    reward: BigNumber;
    currentTierIndex?: number;
    currentTier?: BlockchainReward;
    tiers: RequestResult<BlockchainReward[] | undefined>;
};

export const useRewardByAmount = (
    amountStaked?: number
): RewardByAmountResponse => {
    const tiers = useCurrentTiers();

    return React.useMemo(() => {
        if (!tiers.data || amountStaked === undefined)
            return { reward: BigNumber.from(0), tiers };

        return tiers.data.reduce(
            (reward, innerTier, i) => {
                const response = { ...reward };
                if (innerTier.amount <= amountStaked) {
                    response.reward = response.reward.add(innerTier.reward);
                    response.currentTierIndex = i;
                    response.currentTier = innerTier;
                }

                return response;
            },
            { reward: BigNumber.from(0), tiers } as RewardByAmountResponse
        );
    }, [amountStaked, tiers]);
};

export default useRewardByAmount;
