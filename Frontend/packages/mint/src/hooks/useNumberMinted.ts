import React from 'react';
import { RequestResult, useCurrentTime, useRequest } from '@gac/shared';
import { useContractContext } from '../contexts/ContractContext';
import { MintType } from '../models/MintType';
import { useMintTimes } from './useMintTimes';

const NUMBER_MINTED_KEY = 'NUMBER_MINTED';

export const useNumberMinted = (
    mintType: MintType,
    account?: string
): RequestResult<number> => {
    const { tokenContract } = useContractContext();
    const currentTime = useCurrentTime();
    const { data: mintTimes } = useMintTimes();

    const isReset = React.useMemo(() => {
        if (!mintTimes) return false;

        const { private: privateMintTimes } = mintTimes;
        const { reset } = privateMintTimes;

        if (reset <= currentTime) return true;
        return false;
    }, [currentTime, mintTimes]);

    const query = React.useCallback(
        async (mt: MintType, address?: string, isReset?: boolean) => {
            if (!tokenContract) throw new Error('No contract/address');
            if (!address) return 0;

            if (mt === MintType.Private) {
                return Number(
                    await tokenContract.methods
                        .getPresaleMints(address, !!isReset)
                        .call()
                );
            }

            return Number(
                await tokenContract.methods.getPublicMints(address).call()
            );
        },
        [tokenContract]
    );

    const params = React.useMemo(
        () => [mintType, account, isReset],
        [account, mintType, isReset]
    );

    return useRequest(query, NUMBER_MINTED_KEY, params, {
        staleTime: 1000 * 60 * 5, // 5 mins
    });
};

export default useNumberMinted;
