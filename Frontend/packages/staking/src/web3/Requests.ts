import {
    IERC721Metadata,
    Transfer,
} from '@gac/shared-v2/lib/models/IERC721Metadata';

export const getTokenUri = async (
    contract: IERC721Metadata,
    tokenId: string
): Promise<string> => {
    const tokenUri = await contract.methods.tokenURI(tokenId).call();
    return tokenUri;
};

export const getTokensHeld = async (
    contract: IERC721Metadata,
    address: string
): Promise<string[]> => {
    const tokensIn = (await contract.getPastEvents('Transfer', {
        filter: { to: address },
    })) as never as Transfer[];
    const tokensOut = (await contract.getPastEvents('Transfer', {
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

export default {};
