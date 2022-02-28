import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';

export const getMerkleTree = <T extends string | Buffer>(
    leaves: T[]
): MerkleTree => {
    return new MerkleTree(leaves, keccak256, { sort: true });
};

export const getRoot = (tree: MerkleTree) => tree.getHexRoot();

export const getProof = <T extends string | Buffer>(
    tree: MerkleTree,
    leaf: T
): string[] => {
    return tree.getHexProof(leaf);
};
