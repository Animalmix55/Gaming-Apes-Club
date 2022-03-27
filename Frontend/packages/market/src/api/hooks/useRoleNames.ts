import { RequestResult } from '@gac/shared';
import React from 'react';
import { useRoles } from './useRoles';

export const useRoleNames = (roleIds: string[]): RequestResult<string[]> => {
    const request = useRoles();

    return React.useMemo(
        () =>
            ({
                ...request,
                data: roleIds.map((r) => request.data?.[r] || r),
            } as RequestResult<string[]>),
        [request, roleIds]
    );
};

export default useRoleNames;
