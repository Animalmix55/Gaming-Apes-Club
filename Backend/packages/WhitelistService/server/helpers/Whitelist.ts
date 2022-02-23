import Web3 from 'web3';
import Whitelist from '../data/GAC_Whitelist.json';

export const getWhitelist = (): string[] => {
    return Whitelist.map((v) => v.trim()).filter(Web3.utils.isAddress);
};

export default getWhitelist;
