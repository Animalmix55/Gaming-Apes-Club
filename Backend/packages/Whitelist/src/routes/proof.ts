import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import keccak256 from 'keccak256';
import Web3 from 'web3';
import { getMerkleTree, getProof, getRoot } from '../helpers/MerkleTree';
import getWhitelist from '../helpers/Whitelist';

const WhitelistTree = getMerkleTree(getWhitelist().map(keccak256));

export const ProofRouter = express.Router();

interface GetRequest {
    address: string;
}

interface Response extends BaseResponse {
    proof?: string[];
    root?: string;
}

ProofRouter.get<string, never, Response, never, GetRequest>(
    '/',
    cors(),
    async (req, res) => {
        const { query } = req;
        const { address } = query;

        if (!address || !Web3.utils.isAddress(address)) {
            res.status(500).send({ error: 'Invalid address' });
            return;
        }

        const leaf = keccak256(address);
        const proof = getProof(WhitelistTree, leaf);
        const root = getRoot(WhitelistTree);

        if (proof.length === 0) {
            res.status(404).send({ error: 'Address not found' });
            return;
        }

        res.status(200).send({ proof, root });
    }
);

export default ProofRouter;
