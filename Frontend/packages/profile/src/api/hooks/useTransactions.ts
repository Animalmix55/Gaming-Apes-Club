import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Transaction, TransactionGetResponse } from '../Requests';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';

export const TransactionsKey = 'TRANSACTIONS_USER';

export const useTransactions = (
    userId?: string,
    offset?: number,
    pageSize?: number
): RequestResult<TransactionGetResponse> => {
    const { api } = useGamingApeContext();
    const { token } = useAuthorizationContext();

    const queryFn = React.useCallback(
        (uid?: string, offset?: number, pageSize?: number) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');
            if (!uid) throw new Error('Missing user');

            return Transaction.getByUserId(api, token, uid, offset, pageSize);
        },
        [api, token]
    );

    const result = useRequest(
        queryFn,
        TransactionsKey,
        [userId, offset, pageSize],
        {
            staleTime: Infinity,
        }
    );

    return result;
};
