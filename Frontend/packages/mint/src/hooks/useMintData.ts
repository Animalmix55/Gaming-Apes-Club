import BigDecimal from 'js-big-decimal';
import React from 'react';
import { BASE } from '@gac/shared';
import { RequestResult, useRequest } from '../api/hooks/useRequest';
import { useContractContext } from '../contexts/ContractContext';

interface ReturnType {
    mintPrice: BigDecimal;
    maxPerWallet: number;
}

export const MINT_DATA_KEY = 'MINT_DATA';

export const useMintData = (): RequestResult<ReturnType> => {
    const { tokenContract } = useContractContext();

    const query = React.useCallback(async () => {
        if (!tokenContract) throw new Error('Contract not loaded');

        const mintPrice = new BigDecimal(
            await tokenContract.methods.mintPrice().call()
        ).divide(BASE, 30);

        const maxPerWallet = Number(
            await tokenContract.methods.maxPerWallet().call()
        );

        return { mintPrice, maxPerWallet };
    }, [tokenContract]);

    return useRequest(query, MINT_DATA_KEY, [], { staleTime: Infinity });
};

export default useMintData;
