/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { QueryKey, useQueryClient } from 'react-query';

export const useRequestGetter = <TParams extends any[], TReturn>(
    query: (...params: TParams) => Promise<TReturn>,
    key: QueryKey
): ((...params: TParams) => Promise<TReturn>) => {
    const queryClient = useQueryClient();

    const getResult = React.useCallback(
        (...params: TParams) => {
            const queryFn = (): Promise<TReturn> => query(...params);

            const queryKey = [
                key,
                ...params.filter(
                    (p: unknown) =>
                        typeof p !== 'object' && typeof p !== 'function'
                ),
            ];

            const result = queryClient.fetchQuery({
                queryFn,
                queryKey,
                retry: 2,
            });

            return result;
        },
        [key, query, queryClient]
    );

    return getResult;
};

export default useRequestGetter;
