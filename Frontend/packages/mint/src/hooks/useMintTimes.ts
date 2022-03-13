import { RequestResult, useRequest } from '@gac/shared';
import React from 'react';
import { useContractContext } from '../contexts/ContractContext';

interface ReturnType {
    public: {
        start: number;
    };
    private: {
        start: number;
        reset: number;
        end: number;
    };
}

export const MINT_TIME_KEY = 'MINT_TIME';

/**
 * @param offset The offset in seconds to return, for tolerating delays
 * @returns the mints times
 */
export const useMintTimes = (): RequestResult<ReturnType> => {
    const { tokenContract } = useContractContext();

    const query = React.useCallback(async () => {
        if (!tokenContract) throw new Error('Contract not yet loaded');

        const publicStart = Number(
            await tokenContract.methods.publicStart().call()
        );
        const privateStart = Number(
            await tokenContract.methods.whitelistStart().call()
        );
        const privateReset = Number(
            await tokenContract.methods.whitelistReset().call()
        );
        const privateEnd = Number(
            await tokenContract.methods.whitelistEnd().call()
        );

        return {
            private: {
                start: privateStart,
                reset: privateReset,
                end: privateEnd,
            },
            public: {
                start: publicStart,
            },
        };
    }, [tokenContract]);

    const [params] = React.useState([]);

    const result = useRequest(query, MINT_TIME_KEY, params, {
        staleTime: 1000 * 60 * 5, // 5 mins
    });

    return result;
};

export default useMintTimes;
