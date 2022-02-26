import React from 'react';
import useRequest, { RequestResult } from '../api/hooks/useRequest';
import { useContractContext } from '../contexts/ContractContext';
import MintType from '../models/MintType';

const NUMBER_MINTED_KEY = 'NUMBER_MINTED';

export const useNumberMinted = (
    mintType: MintType,
    account?: string
): RequestResult<number> => {
    const { tokenContract } = useContractContext();

    const query = React.useCallback(
        async (mt: MintType, address?: string) => {
            if (!tokenContract) throw new Error('No contract/address');
            if (!address) return 0;

            if (mt === MintType.Private) {
                return Number(
                    await tokenContract.methods.getPresaleMints(address).call()
                );
            }
            return Number(
                await tokenContract.methods.getPublicMints(address).call()
            );
        },
        [tokenContract]
    );

    const params = React.useMemo(
        () => [mintType, account],
        [account, mintType]
    );

    return useRequest(query, NUMBER_MINTED_KEY, params, {
        staleTime: 1000 * 60 * 5, // 5 mins
    });
};

export default useNumberMinted;
