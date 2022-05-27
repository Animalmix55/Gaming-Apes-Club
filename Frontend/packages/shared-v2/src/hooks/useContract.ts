import React from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { GACStaking } from '../models/GACStaking';
import { BaseContract } from '../models/types';

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

export const useContract = <T extends BaseContract>(
    web3: Web3 | undefined,
    abi: AbiItem[],
    address: string | undefined
): T | undefined => {
    const contract = React.useMemo(() => {
        if (!web3 || !address) return undefined;
        return new web3.eth.Contract(abi, address);
    }, [abi, address, web3]);

    return contract as never as T;
};

export const useGACStakingContract = (
    web3?: Web3,
    address?: string
): GACStaking | undefined => {
    return useContract(web3, GACStakingABI as never, address);
};

export const useGACStakingChildContract = (
    web3?: Web3,
    address?: string
): GACStakingChild | undefined => {
    return useContract(web3, GACStakingChildABI as never, address);
};

export const useGACXPContract = (
    web3?: Web3,
    address?: string
): GACXP | undefined => {
    return useContract(web3, GACXPABI as never, address);
};

export const useGamingApeClubContract = (
    web3?: Web3,
    address?: string
): GamingApeClub | undefined => {
    return useContract(web3, GamingApeClubABI as never, address);
};

export const useIERC20Contract = (
    web3?: Web3,
    address?: string
): IERC20 | undefined => {
    return useContract(web3, IERC20ABI as never, address);
};

export const useIERC721MetadataContract = (
    web3?: Web3,
    address?: string
): IERC721Metadata | undefined => {
    return useContract(web3, IERC721MetadataABI as never, address);
};

export default useContract;
