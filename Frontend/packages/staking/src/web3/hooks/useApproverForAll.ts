/* eslint-disable no-alert */
import React from 'react';
import {
    ERC721_IS_APPROVED_FOR_ALL_KEY,
    useIERC721MetadataContract,
    useMutation,
    useWeb3,
} from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAppConfiguration } from '../../contexts/AppConfigurationContext';
import { setApprovalForAll } from '../Requests';

export const useApproverForAll = (
    contractAddress?: string
): UseMutationResult<
    void,
    unknown,
    [operator: string, approved: boolean],
    unknown
> & {
    txHash?: string;
} => {
    const { EthereumChainId } = useAppConfiguration();
    const { provider, accounts, requestNewChain, readonly } =
        useWeb3(EthereumChainId);

    const contract = useIERC721MetadataContract(
        provider,
        contractAddress,
        readonly
    );
    const account = accounts?.[0];
    const queryClient = useQueryClient();

    const [txHash, setTxHash] = React.useState<string>();

    const query = React.useCallback(
        async (operator: string, approved: boolean) => {
            await requestNewChain();
            if (!account) {
                alert('Not connected to a wallet');
                throw new Error('Not connected to a wallet');
            }

            if (!contract) return;
            await setApprovalForAll(
                contract,
                operator,
                approved,
                account,
                setTxHash
            );
        },
        [account, contract, requestNewChain]
    );

    const result = useMutation(query, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ERC721_IS_APPROVED_FOR_ALL_KEY,
            });
        },
    });

    return { ...result, txHash };
};

export default useApproverForAll;
