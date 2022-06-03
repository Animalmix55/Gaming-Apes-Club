/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Web3Provider } from '@ethersproject/providers';
import { signERC2612Permit } from 'eth-permit';
import { GACXP } from '../models/GACXP';

export const signPermit = async (
    provider: Web3Provider,
    token: GACXP,
    operator: string,
    amount: string,
    deadline: number
) => {
    const signer = provider.getSigner();
    const owner = await signer.getAddress();

    const { r, s, v } = await signERC2612Permit(
        provider,
        token.address,
        owner,
        operator,
        amount,
        deadline
    );

    return { r, s, v, deadline };
};

export default signPermit;