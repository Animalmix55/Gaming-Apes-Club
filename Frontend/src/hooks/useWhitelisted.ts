import React from 'react';
import Web3 from 'web3';
import { useProofGetter } from '../api/hooks/useProofGetter';

interface WhitelistResponse {
    isWhitelisted?: boolean;
    proof?: string[];
}

export const useWhitelisted = (address?: string): WhitelistResponse => {
    const [whitelisted, setWhitelisted] = React.useState<WhitelistResponse>({});
    const whitelistProofGetter = useProofGetter();

    React.useEffect(() => {
        if (!address || !Web3.utils.isAddress(address)) {
            setWhitelisted({ isWhitelisted: false });
            return;
        }
        setWhitelisted({});

        whitelistProofGetter(address)
            .then((r) => {
                setWhitelisted({ proof: r, isWhitelisted: r.length > 0 });
            })
            .catch(() => setWhitelisted({ isWhitelisted: false }));
    }, [address, whitelistProofGetter]);

    return whitelisted;
};

export default useWhitelisted;
