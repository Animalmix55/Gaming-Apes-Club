import axios from 'axios';
import React from 'react';
import { useMutation } from '@gac/shared';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Transaction, TransactionSendResponse } from '../Requests';
import { TransactionsKey } from './useTransactions';
import { BalanceKey } from './useBalance';
import { ListingKey } from './useListing';
import { ListingsKey } from './useListings';

export const useTransactionSubmitter = (
    onRequestSignature: (message: string) => Promise<string>
): UseMutationResult<
    TransactionSendResponse,
    unknown,
    [listingId: string, quantity?: number, address?: string | undefined],
    unknown
> => {
    const { token } = useAuthorizationContext();
    const { api } = useGamingApeContext();

    const queryClient = useQueryClient();

    const query = React.useCallback(
        async (listingId: string, quantity?: number, address?: string) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');

            let response: TransactionSendResponse;
            try {
                response = await Transaction.send(
                    api,
                    token,
                    listingId,
                    quantity,
                    undefined,
                    undefined,
                    address
                );
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    response = (e.response?.data ||
                        {}) as TransactionSendResponse;

                    const { signableMessage } = response;

                    if (!signableMessage) throw e;
                } else throw e;
            }

            const { signableMessage, signableMessageToken } = response;
            if (signableMessage) {
                const signature = await onRequestSignature(signableMessage);
                // try again

                response = await Transaction.send(
                    api,
                    token,
                    listingId,
                    quantity,
                    signableMessageToken,
                    signature,
                    address
                );
                return response;
            }

            return response;
        },
        [api, onRequestSignature, token]
    );

    return useMutation(query, {
        onSuccess: async (): Promise<void> => {
            await queryClient.refetchQueries({ queryKey: [TransactionsKey] });
            await queryClient.refetchQueries({ queryKey: [ListingKey] });
            await queryClient.refetchQueries({ queryKey: [ListingsKey] });
            await queryClient.refetchQueries({ queryKey: [BalanceKey] });
        },
    });
};

export default useTransactionSubmitter;
