import express from 'express';
import { BaseResponse } from '@gac/shared';
import keccak256 from 'keccak256';
import Web3 from 'web3';
import { getMerkleTree, getProof } from '../helpers/MerkleTree';
import getWhitelist from '../helpers/Whitelist';

const WhitelistTree = getMerkleTree(getWhitelist().map(keccak256));

const router = express.Router();

interface GetRequest {
    address: string;
}

interface Response extends BaseResponse {
    proof?: string[];
}

router.get<string, never, Response, never, GetRequest>(
    '/',
    async (req, res) => {
        const { query } = req;
        const { address } = query;

        if (!address || !Web3.utils.isAddress(address)) {
            res.status(500).send({ error: 'Invalid address' });
            return;
        }

        const leaf = keccak256(address);
        const proof = getProof(WhitelistTree, leaf);

        if (proof.length === 0) {
            res.status(404).send({ error: 'Address not found' });
            return;
        }

        res.status(200).send({ proof });
    }
);

export default router;
