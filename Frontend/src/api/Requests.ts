import axios from 'axios';
import { toast } from 'react-toastify';
import { ProofResponse } from '../models/Proof';

export const getProof = async (
    api: string,
    address: string
): Promise<string[]> => {
    try {
        const { data } = await axios.get<ProofResponse>(
            `${api}/proof?address=${address}`
        );

        const { proof } = data;
        return proof;
    } catch (e) {
        toast(e);
        throw e;
    }
};

export default {};
