import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Roles } from '../Requests';

export const RolesKey = 'ROLES';

export const useRoles = (): RequestResult<Record<string, string>> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(async () => {
        if (!api) throw new Error('Missing api');

        return Roles.getRoles(api);
    }, [api]);

    const result = useRequest(queryFn, RolesKey, [], {
        staleTime: 5 * 60 * 1000, // 5 mins
    });

    return result;
};
