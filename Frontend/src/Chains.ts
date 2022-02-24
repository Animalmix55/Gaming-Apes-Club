import type { AddEthereumChainParameter } from '@web3-react/types';

interface BasicChainInformation {
    urls: (string | undefined)[];
    name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
    nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
    blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
    chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
    return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
    chainId: number
): AddEthereumChainParameter | number {
    const chainInformation = CHAINS[chainId];
    if (isExtendedChainInformation(chainInformation)) {
        return {
            chainId,
            chainName: chainInformation.name,
            nativeCurrency: chainInformation.nativeCurrency,
            rpcUrls: chainInformation.urls as string[],
            blockExplorerUrls: chainInformation.blockExplorerUrls,
        };
    }
    return chainId;
}

export const CHAINS: {
    [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
    1: {
        urls: [
            process.env.infuraKey
                ? `https://mainnet.infura.io/v3/${process.env.infuraKey}`
                : undefined,
            'https://cloudflare-eth.com',
        ].filter((url) => url !== undefined),
        name: 'Mainnet',
    },
    3: {
        urls: [
            process.env.infuraKey
                ? `https://ropsten.infura.io/v3/${process.env.infuraKey}`
                : undefined,
        ].filter((url) => url !== undefined),
        name: 'Ropsten',
    },
    4: {
        urls: [
            process.env.infuraKey
                ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}`
                : undefined,
        ].filter((url) => url !== undefined),
        name: 'Rinkeby',
    },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
    CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
    const validURLs = CHAINS[Number(chainId)].urls as string[];

    if (validURLs.length) {
        accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
}, {});
