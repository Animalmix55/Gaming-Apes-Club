import { BigNumber } from '@ethersproject/bignumber';
import { GamingApeClub } from '@gac/shared-v2';
import { GACStaking } from '@gac/shared-v2/lib/models/GACStaking';
import { GACStakingChild } from '@gac/shared-v2/lib/models/GACStakingChild';

import { IERC20 } from '@gac/shared-v2/lib/models/IERC20';
import { IERC721Metadata } from '@gac/shared-v2/lib/models/IERC721Metadata';

export const getTokenUri = async (
    contract: IERC721Metadata,
    tokenId: string
): Promise<string> => {
    const [tokenUri] = await contract.functions.tokenURI(tokenId);
    return tokenUri;
};

export const getTokensHeld = async (
    contract: IERC721Metadata,
    address: string
): Promise<string[]> => {
    const tokensInFilter = contract.filters.Transfer(null, address);
    const tokensIn = await contract.queryFilter(tokensInFilter);

    const tokensOutFilter = contract.filters.Transfer(address);
    const tokensOut = await contract.queryFilter(tokensOutFilter);

    const balances: Record<string, number> = {};
    tokensIn.forEach(({ args }) => {
        const { tokenId: idBN } = args;

        const tokenId = idBN.toNumber();
        if (!balances[tokenId]) balances[tokenId] = 0;
        balances[tokenId]++;
    });
    tokensOut.forEach(({ args }) => {
        const { tokenId } = args;

        balances[tokenId.toNumber()]--;
    });

    return Object.keys(balances)
        .map((t) => (balances[t] > 0 ? t : undefined))
        .filter((t) => !!t) as string[];
};

export const getTokensStaked = async (
    contract: GamingApeClub,
    stakingContractAddress: string,
    userAddress: string
): Promise<string[]> => {
    const tokensInFilter = await contract.filters.Transfer(
        userAddress,
        stakingContractAddress
    );
    const tokensIn = await contract.queryFilter(tokensInFilter);

    const tokensOutFilter = await contract.filters.Transfer(
        stakingContractAddress,
        userAddress
    );
    const tokensOut = await contract.queryFilter(tokensOutFilter);

    const balances: Record<string, number> = {};

    tokensIn.forEach(({ args }) => {
        const { tokenId: idBN } = args;

        const tokenId = idBN.toNumber();
        if (!balances[tokenId]) balances[tokenId] = 0;
        balances[tokenId]++;
    });

    tokensOut.forEach(({ args }) => {
        const { tokenId: idBN } = args;
        const tokenId = idBN.toNumber();

        balances[tokenId]--;
    });

    return Object.keys(balances)
        .map((t) => (balances[t] > 0 ? t : undefined))
        .filter((t) => !!t) as string[];
};

export const getReward = async (
    contract: GACStakingChild,
    user: string
): Promise<BigNumber> => {
    const [reward] = await contract.functions.getReward(user);
    return reward;
};

export const getStakingLastUpdatedTime = async (
    contract: GACStakingChild,
    user: string
): Promise<number> => {
    const { lastUpdated } = await contract.functions.stakes(user);
    return lastUpdated.toNumber();
};

export const getNFTBalance = async (
    contract: IERC721Metadata,
    address: string
): Promise<number> => {
    const [amount] = await contract.functions.balanceOf(address);
    return amount.toNumber();
};

export const getERC20Balance = async (
    contract: IERC20,
    address: string
): Promise<BigNumber> => {
    const [balance] = await contract.functions.balanceOf(address);
    return balance;
};

export const getERC20Supply = async (contract: IERC20): Promise<BigNumber> => {
    const [supply] = await contract.functions.totalSupply();
    return supply;
};

export const stakeTokens = async (
    contract: GACStaking,
    tokens: string[],
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = await contract.functions.stake(tokens, { from });
    if (onTxHash) onTxHash(result.hash);
    await result.wait();
    await result;
};

export const unstakeTokens = async (
    contract: GACStaking,
    tokens: string[],
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = await contract.functions.unstake(tokens, { from });
    if (onTxHash) onTxHash(result.hash);
    await result.wait();
    await result;
};

export const claimRewards = async (
    contract: GACStakingChild,
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = await contract.functions.claimReward({ from });
    if (onTxHash) onTxHash(result.hash);
    await result.wait();
    await result;
};

export interface BlockchainReward {
    amount: number;
    reward: BigNumber;
}

export const getRewardTiers = async (
    contract: GACStakingChild
): Promise<BlockchainReward[]> => {
    const { 0: holdingAmounts, 1: rewardAmounts } =
        await contract.functions.dumpRewards();

    return holdingAmounts.map(
        (holdingAmount, i): BlockchainReward => ({
            amount: holdingAmount.toNumber(),
            reward: rewardAmounts[i],
        })
    );
};

export default {};
