import React from 'react';
import { useContractContext } from '../contexts/ContractContext';

interface ReturnType {
    public: {
        start?: number;
    };
    private: {
        start?: number;
        end?: number;
    };
}

/**
 * @param offset The offset in seconds to return, for tolerating delays
 * @returns the mints times
 */
export const useMintTimes = (offset: number): ReturnType => {
    const { tokenContract } = useContractContext();

    const [publicStart, setPublicStart] = React.useState<number>();
    const [privateStart, setPrivateStart] = React.useState<number>();
    const [privateEnd, setPrivateEnd] = React.useState<number>();

    React.useEffect(() => {
        if (!tokenContract) {
            setPublicStart(Infinity);
            setPrivateEnd(Infinity);
            setPrivateStart(Infinity);

            return;
        }

        setPublicStart(undefined);
        setPrivateEnd(undefined);
        setPrivateStart(undefined);

        tokenContract.methods
            .publicStart()
            .call()
            .then((v) => setPublicStart(Number(v)))
            .catch(() => setPublicStart(Infinity));
        tokenContract.methods
            .whitelistStart()
            .call()
            .then((v) => setPrivateStart(Number(v)))
            .catch(() => setPrivateStart(Infinity));
        tokenContract.methods
            .whitelistEnd()
            .call()
            .then((v) => setPrivateEnd(Number(v)))
            .catch(() => setPrivateEnd(Infinity));
    }, [tokenContract]);

    return {
        private: {
            start:
                privateStart !== undefined ? privateStart + offset : undefined,
            end: privateEnd,
        },
        public: {
            start: publicStart !== undefined ? publicStart + offset : undefined,
        },
    };
};

export default useMintTimes;
