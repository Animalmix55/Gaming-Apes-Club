import React from 'react';
import { RequestResult, useRequest } from '@gac/shared-v2';
import { IERC721Metadata } from '@gac/shared-v2/lib/models/IERC721Metadata';
import { getTokensHeld } from '../Requests';

export const TOKENS_HELD_KEY = 'TOKENS_HELD';

export const useTokensHeld = (
    address: string,
    contract: IERC721Metadata
): RequestResult<string[]> => {
    const { defaultAccount } = contract;

    const request = React.useCallback(
        (address: string) => {
            return getTokensHeld(contract, address);
        },
        [contract]
    );

    return useRequest(
        request,
        TOKENS_HELD_KEY,
        [address, defaultAccount ?? ''],
        {
            staleTime: Infinity,
        }
    );
};
