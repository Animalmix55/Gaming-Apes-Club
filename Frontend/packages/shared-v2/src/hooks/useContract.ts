import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { BaseContract, ethers } from 'ethers';
import { GACStaking } from '../models/GACStaking';
import GACStakingABI from '../assets/web3/GACStakingABI.json';
import GACStakingChildABI from '../assets/web3/GACStakingChildABI.json';
import GACXPABI from '../assets/web3/GACXPABI.json';
import GamingApeClubABI from '../assets/web3/GamingApeClubABI.json';
import IERC20ABI from '../assets/web3/IERC20ABI.json';
import IERC721MetadataABI from '../assets/web3/IERC721MetadataABI.json';
import { GamingApeClub } from '../models/GamingApeClub';
import { GACXP } from '../models/GACXP';
import { GACStakingChild } from '../models/GACStakingChild';
import { IERC20 } from '../models/IERC20';
import { IERC721Metadata } from '../models/IERC721Metadata';

export const useContract = <T extends ethers.Contract>(
    provider: Web3Provider | undefined,
    abi: ethers.ContractInterface,
    address: string | undefined
): T | undefined => {
    const [contract, _setContract] = React.useState<T>();
    React.useEffect(() => {
        if (!provider || !address) {
            _setContract(undefined);
            return;
        }

        const getContract = async (): Promise<void> => {
            let readonly = false;
            try {
                await provider.getSigner().getAddress();
            } catch (e) {
                readonly = true;
            }

            const newContract = new ethers.Contract(
                address,
                abi,
                readonly ? provider : provider.getSigner()
            );

            _setContract(newContract as never);
        };
        getContract();
    }, [abi, address, provider]);

    return contract as never as T;
};

export const useGACStakingContract = (
    provider?: Web3Provider,
    address?: string
): GACStaking | undefined => {
    return useContract(provider, GACStakingABI, address);
};

export const useGACStakingChildContract = (
    provider?: Web3Provider,
    address?: string
): GACStakingChild | undefined => {
    return useContract(provider, GACStakingChildABI, address);
};

export const useGACXPContract = (
    provider?: Web3Provider,
    address?: string
): GACXP | undefined => {
    return useContract(provider, GACXPABI, address);
};

export const useGamingApeClubContract = (
    provider?: Web3Provider,
    address?: string
): GamingApeClub | undefined => {
    return useContract(provider, GamingApeClubABI, address);
};

export const useIERC20Contract = (
    provider?: Web3Provider,
    address?: string
): IERC20 | undefined => {
    return useContract(provider, IERC20ABI, address);
};

export const useIERC721MetadataContract = (
    provider?: Web3Provider,
    address?: string
): IERC721Metadata | undefined => {
    return useContract(provider, IERC721MetadataABI, address);
};

export default useContract;
