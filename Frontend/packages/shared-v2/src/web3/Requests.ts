import { BigNumber } from '@ethersproject/bignumber';
import { IERC20 } from '../models/IERC20';
import { IERC721Metadata } from '../models/IERC721Metadata';

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

export const isApprovedForAll = async (
    contract: IERC721Metadata,
    owner: string,
    operator: string
): Promise<boolean> => {
    const [isApproved] = await contract.functions.isApprovedForAll(
        owner,
        operator
    );
    return isApproved;
};

export default {};
