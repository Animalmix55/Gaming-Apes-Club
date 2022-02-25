import React from 'react';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { getProof } from '../Requests';
import useRequestGetter from './useRequestGetter';

export const PROOF_KEY = 'PROOF';

export const useProofGetter = (): ((address: string) => Promise<string[]>) => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        (address: string) => {
            if (!api) throw new Error('Missing api');
            return getProof(api, address);
        },
        [api]
    );

    return useRequestGetter(queryFn, PROOF_KEY);
};
