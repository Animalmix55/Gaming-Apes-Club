import React from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { GACStaking } from '../models/GACStaking';
import { BaseContract } from '../models/types';

import GACStakingABI from '../assets/web3/GACStakingABI.json';
import GACStakingChildABI from '../assets/web3/GACStakingChildABI.json';
import GACXPABI from '../assets/web3/GACXPABI.json';
import GamingApeClubABI from '../assets/web3/GamingApeClubABI.json';

export const useContract = <T extends BaseContract>(
    web3: Web3,
    abi: AbiItem[],
    address: string
): T => {
    const contract = React.useMemo(
        () => new web3.eth.Contract(abi, address),
        [abi, address, web3]
    );

    return contract as never as T;
};

export const useGACStakingContract = (
    web3: Web3,
    address: string
): GACStaking => {
    return useContract(web3, GACStakingABI as never, address);
};

export const useGACStakingChildContract = (
    web3: Web3,
    address: string
): GACStaking => {
    return useContract(web3, GACStakingChildABI as never, address);
};

export const useGACXPContract = (web3: Web3, address: string): GACStaking => {
    return useContract(web3, GACXPABI as never, address);
};

export const useGamingApeClubContract = (
    web3: Web3,
    address: string
): GACStaking => {
    return useContract(web3, GamingApeClubABI as never, address);
};

export default useContract;
