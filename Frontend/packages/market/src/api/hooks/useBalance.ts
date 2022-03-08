import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Balance } from '../Requests';

export const BalanceKey = 'BALANCE';

export const useBalance = (discordId?: string): RequestResult<number> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        async (discordId: string) => {
            if (!discordId) return 0;
            if (!api) throw new Error('Missing api');

            return Balance.getBalance(api, discordId);
        },
        [api]
    );

    const result = useRequest(queryFn, BalanceKey, [discordId], {
        staleTime: Infinity,
    });

    return result;
};
