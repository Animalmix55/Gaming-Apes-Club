import { BigNumber } from '@ethersproject/bignumber';
import { GamingApeClub } from '@gac/shared-v2';
import { GACStaking } from '@gac/shared-v2/lib/models/GACStaking';
import { GACStakingChild } from '@gac/shared-v2/lib/models/GACStakingChild';

import { IERC20 } from '@gac/shared-v2/lib/models/IERC20';
import {
    IERC721Metadata,
    Transfer,
} from '@gac/shared-v2/lib/models/IERC721Metadata';

export const getTokenUri = async (
    contract: IERC721Metadata,
    tokenId: string
): Promise<string> => {
    const tokenUri = await contract.methods.tokenURI(tokenId).call({});
    return tokenUri;
};

export const getTokensHeld = async (
    contract: IERC721Metadata,
    address: string
): Promise<string[]> => {
    const tokensIn = (await contract.getPastEvents('Transfer', {
        fromBlock: 0,
        filter: { to: address },
    })) as never as Transfer[];
    const tokensOut = (await contract.getPastEvents('Transfer', {
        fromBlock: 0,
        filter: { from: address },
    })) as never as Transfer[];

    const balances: Record<string, number> = {};
    tokensIn.forEach(({ returnValues }) => {
        const { tokenId } = returnValues;

        if (!balances[tokenId]) balances[tokenId] = 0;
        balances[tokenId]++;
    });
    tokensOut.forEach(({ returnValues }) => {
        const { tokenId } = returnValues;

        balances[tokenId]--;
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
    const tokensIn = (await contract.getPastEvents('Transfer', {
        fromBlock: 0,
        filter: { from: userAddress, to: stakingContractAddress },
    })) as never as Transfer[];
    const tokensOut = (await contract.getPastEvents('Transfer', {
        fromBlock: 0,
        filter: { to: userAddress, from: stakingContractAddress },
    })) as never as Transfer[];

    const balances: Record<string, number> = {};
    tokensIn.forEach(({ returnValues }) => {
        const { tokenId } = returnValues;

        if (!balances[tokenId]) balances[tokenId] = 0;
        balances[tokenId]++;
    });
    tokensOut.forEach(({ returnValues }) => {
        const { tokenId } = returnValues;

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
    const reward = await contract.methods.getReward(user).call({});
    return BigNumber.from(reward);
};

export const getStakingLastUpdatedTime = async (
    contract: GACStakingChild,
    user: string
): Promise<number> => {
    const { lastUpdated } = await contract.methods.stakes(user).call({});
    return Number(lastUpdated);
};

export const getNFTBalance = async (
    contract: IERC721Metadata,
    address: string
): Promise<number> => {
    const amount = await contract.methods.balanceOf(address).call({});
    return Number(amount);
};

export const getERC20Balance = async (
    contract: IERC20,
    address: string
): Promise<BigNumber> => {
    const balance = await contract.methods.balanceOf(address).call({});
    return BigNumber.from(balance);
};

export const getERC20Supply = async (contract: IERC20): Promise<BigNumber> => {
    const supply = await contract.methods.totalSupply().call({});
    return BigNumber.from(supply);
};

export const stakeTokens = async (
    contract: GACStaking,
    tokens: string[],
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = contract.methods.stake(tokens).send({ from });
    if (onTxHash) result.on('transactionHash', onTxHash);
    await result;
};

export const unstakeTokens = async (
    contract: GACStaking,
    tokens: string[],
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = contract.methods.unstake(tokens).send({ from });
    if (onTxHash) result.on('transactionHash', onTxHash);
    await result;
};

export const claimRewards = async (
    contract: GACStakingChild,
    from: string,
    onTxHash?: (hash: string) => void
): Promise<void> => {
    const result = contract.methods.claimReward().send({ from });
    if (onTxHash) result.on('transactionHash', onTxHash);
    await result;
};

export interface BlockchainReward {
    amount: number;
    reward: BigNumber;
}

export const getRewardTiers = async (
    contract: GACStakingChild
): Promise<BlockchainReward[]> => {
    const { 0: holdingAmounts, 1: rewardAmounts } = await contract.methods
        .dumpRewards()
        .call();

    return holdingAmounts.map(
        (holdingAmount, i): BlockchainReward => ({
            amount: Number(holdingAmount),
            reward: BigNumber.from(rewardAmounts[i]),
        })
    );
};

export default {};
