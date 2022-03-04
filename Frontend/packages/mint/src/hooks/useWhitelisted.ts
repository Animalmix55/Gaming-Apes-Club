import React from 'react';
import { RequestResult, useRequest } from '../api/hooks/useRequest';
import { getProof } from '../api/Requests';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

interface WhitelistResponse {
    isWhitelisted: boolean;
    proof?: string[];
}

const WHITELIST_KEY = 'WHITELIST';

export const useWhitelisted = (
    address?: string
): RequestResult<WhitelistResponse> => {
    const { api } = useGamingApeContext();

    const query = React.useCallback(
        async (account?: string): Promise<WhitelistResponse> => {
            if (!account || !api) return { isWhitelisted: false };

            try {
                const proof = await getProof(api, account);
                return { isWhitelisted: true, proof };
            } catch (e) {
                if (!String(e).includes('404')) throw e;
                return { isWhitelisted: false };
            }
        },
        [api]
    );

    const params = React.useMemo(() => [address], [address]);

    return useRequest(query, WHITELIST_KEY, params, {
        staleTime: 1000 * 60 * 5, // 5 mins
    });
};

export default useWhitelisted;
