import { RequestResult } from '@gac/shared-v2';
import React from 'react';
import { ListingRole } from '../Models/ListingRole';
import { useRoles } from './useRoles';

export const useRoleNames = (roles: ListingRole[]): RequestResult<string[]> => {
    const request = useRoles();

    return React.useMemo(
        () =>
            ({
                ...request,
                data: roles.map((r) => request.data?.[r.roleId] || r.roleId),
            } as RequestResult<string[]>),
        [request, roles]
    );
};

export default useRoleNames;
