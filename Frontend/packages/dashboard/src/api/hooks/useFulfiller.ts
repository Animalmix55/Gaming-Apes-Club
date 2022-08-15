import React from 'react';
import { useMutation } from '@gac/shared-v2';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Transaction } from '../Requests';
import { Transaction as TransactionModel } from '../Models/Transaction';
import { TransactionsKey } from './useTransactions';

export const useFulfiller = (): UseMutationResult<
    TransactionModel,
    unknown,
    [listing: string],
    unknown
> => {
    const { token } = useAuthorizationContext();
    const { api } = useGamingApeContext();
    const queryClient = useQueryClient();

    const query = React.useCallback(
        async (transactionId: string) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');
            if (!transactionId) throw new Error('Missing transaction id');

            return Transaction.fulfill(api, token, transactionId);
        },
        [api, token]
    );

    return useMutation(query, {
        onSuccess: async (): Promise<void> => {
            await queryClient.refetchQueries({ queryKey: [TransactionsKey] });
        },
    });
};

export default useFulfiller;
