import React from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { GACStaking } from '../models/GACStaking';
import GACStakingABI from '../assets/web3/GACStakingABI.json';
import GACStakingChildABI from '../assets/web3/GACStakingChildABI.json';
import GACXPABI from '../assets/web3/GACXPABI.json';
import GamingApeClubABI from '../assets/web3/GamingApeClubABI.json';
import IERC20ABI from '../assets/web3/IERC20ABI.json';
import IERC721MetadataABI from '../assets/web3/IERC721MetadataABI.json';
import GACStakingAncilaryABI from '../assets/web3/GACStakingAncilaryABI.json';
import ERC20ABI from '../assets/web3/ERC20ABI.json';
import { GamingApeClub } from '../models/GamingApeClub';
import { GACXP } from '../models/GACXP';
import { GACStakingChild } from '../models/GACStakingChild';
import { IERC20 } from '../models/IERC20';
import { IERC721Metadata } from '../models/IERC721Metadata';
import { GACStakingAncilary } from '../models/GACStakingAncilary';
import { ERC20 } from '../models/ERC20';

export const useContract = <T extends ethers.Contract>(
    provider: JsonRpcProvider | undefined,
    abi: ethers.ContractInterface,
    address: string | undefined,
    readonly?: boolean
): T | undefined => {
    return React.useMemo((): T | undefined => {
        if (!provider || !address) {
            return undefined;
        }

        return new ethers.Contract(
            address,
            abi,
            readonly ? provider : provider.getSigner()
        ) as never as T;
    }, [abi, address, provider, readonly]);
};

export const useGACStakingContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): GACStaking | undefined => {
    return useContract(provider, GACStakingABI, address, readonly);
};

export const useGACStakingChildContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): GACStakingChild | undefined => {
    return useContract(provider, GACStakingChildABI, address, readonly);
};

export const useGACXPContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): GACXP | undefined => {
    return useContract(provider, GACXPABI, address, readonly);
};

export const useGamingApeClubContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): GamingApeClub | undefined => {
    return useContract(provider, GamingApeClubABI, address, readonly);
};

export const useIERC20Contract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): IERC20 | undefined => {
    return useContract(provider, IERC20ABI, address, readonly);
};

export const useIERC721MetadataContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): IERC721Metadata | undefined => {
    return useContract(provider, IERC721MetadataABI, address, readonly);
};

export const useGACStakingAncilaryContract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): GACStakingAncilary | undefined => {
    return useContract(provider, GACStakingAncilaryABI, address, readonly);
};

export const useERC20Contract = (
    provider?: JsonRpcProvider,
    address?: string,
    readonly?: boolean
): ERC20 | undefined => {
    return useContract(provider, ERC20ABI, address, readonly);
};

export default useContract;
