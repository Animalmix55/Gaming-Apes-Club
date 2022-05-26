import React from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { GACStaking } from '../models/GACStaking';
import { BaseContract } from '../models/types';

import GACStakingABI from '../assets/web3/GACStakingABI.json';
import GACStakingChildABI from '../assets/web3/GACStakingChildABI.json';
import GACXPABI from '../assets/web3/GACXPABI.json';
import GamingApeClubABI from '../assets/web3/GamingApeClubABI.json';
import { GamingApeClub } from '../models/GamingApeClub';

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
): GACStaking | undefined => {
    return useContract(web3, GACStakingChildABI as never, address);
};

export const useGACXPContract = (
    web3?: Web3,
    address?: string
): GACStaking | undefined => {
    return useContract(web3, GACXPABI as never, address);
};

export const useGamingApeClubContract = (
    web3?: Web3,
    address?: string
): GamingApeClub | undefined => {
    return useContract(web3, GamingApeClubABI as never, address);
};

export default useContract;
