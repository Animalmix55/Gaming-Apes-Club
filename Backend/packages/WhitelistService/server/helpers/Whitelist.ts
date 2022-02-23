import fs from 'fs';
import Web3 from 'web3';

const getWhitelistFile = (): string => {
    const wlDir = process.env.WHITELIST_DIR;
    if (!wlDir) {
        console.error('Whitelist not found');
        process.exit(1);
    }

    return fs.readFileSync(wlDir).toString();
};

export const getWhitelist = (): string[] => {
    const wlFile = getWhitelistFile();

    return wlFile
        .split('\n')
        .map((v) => v.trim())
        .filter(Web3.utils.isAddress);
};

export default getWhitelist;
