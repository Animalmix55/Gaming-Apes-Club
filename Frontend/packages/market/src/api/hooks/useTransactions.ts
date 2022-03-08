import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Transaction, TransactionGetResponse } from '../Requests';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';

export const TransactionsKey = 'TRANSACTIONS';

export const useTransactions = (
    userId?: string,
    listingId?: string,
    offset?: number,
    pageSize?: number
): RequestResult<TransactionGetResponse> => {
    const { api } = useGamingApeContext();
    const { token } = useAuthorizationContext();

    const queryFn = React.useCallback(
        (uid?: string, lid?: string, offset?: number, pageSize?: number) => {
            if (!token) throw new Error('Missing token');
            if (!api) throw new Error('Missing api');
            if (lid && uid)
                throw new Error('Cannot filter by both user and listing');

            if (uid)
                return Transaction.getByUserId(
                    api,
                    token,
                    uid,
                    offset,
                    pageSize
                );
            if (lid)
                return Transaction.getByListingId(
                    api,
                    token,
                    lid,
                    offset,
                    pageSize
                );
            return Transaction.getBulk(api, token, offset, pageSize);
        },
        [api, token]
    );

    const result = useRequest(
        queryFn,
        TransactionsKey,
        [userId, listingId, offset, pageSize],
        {
            staleTime: Infinity,
        }
    );

    return result;
};
