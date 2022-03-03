import Web3 from 'web3';
import crypto from 'crypto';
import { GamingApeClub } from '../models/GamingApeClub';
import GamingApeClubAbi from '../abis/GamingApeClubAbi.json';

export const generateLoginMessage = (): string => {
    const code = crypto.randomBytes(64).toString('hex');

    return `Sign this message to login and transact. Ignore this: ${code}`;
};

/**
 * @returns the account that signed the message
 */
export const verifySignature = (
    signature: string,
    message: string,
    web3: Web3
): string => {
    return web3.eth.accounts.recover(message, signature);
};

export const getGamingApeClubContract = (
    address: string,
    web3: Web3
): GamingApeClub => {
    return new web3.eth.Contract(
        GamingApeClubAbi as never,
        address
    ) as unknown as GamingApeClub;
};
