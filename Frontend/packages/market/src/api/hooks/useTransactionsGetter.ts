import React from 'react';
import { useRequestGetter } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { Transaction, TransactionGetResponse } from '../Requests';
import { TransactionsKey } from './useTransactions';

export const useTransactionsGetter = (): ((
    uid?: string | undefined,
    lid?: string | undefined,
    offset?: number | undefined,
    pageSize?: number | undefined
) => Promise<TransactionGetResponse>) => {
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

    const result = useRequestGetter(queryFn, TransactionsKey);

    return result;
};

export default useTransactionsGetter;
