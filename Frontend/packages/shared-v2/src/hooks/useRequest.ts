/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    QueryFunction,
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from 'react-query';

export type RequestResult<TData> = UseQueryResult<TData, unknown>;

export const useRequest = <TParams extends any[], TData>(
    query: (...params: TParams) => Promise<TData>,
    key: QueryKey,
    params: TParams,
    queryOptions?: UseQueryOptions<TData, unknown, TData>
): RequestResult<TData> => {
    const queryKey = React.useMemo<string[]>(
        () => [
            key,
            ...params.filter(
                (p: unknown) => typeof p !== 'object' && typeof p !== 'function'
            ),
        ],
        [key, params]
    );

    const queryFn = React.useCallback<QueryFunction<TData, typeof queryKey>>(
        (): Promise<TData> => query(...params),
        [query, params]
    );

    const response = useQuery<TData, unknown, TData>({
        queryFn,
        queryKey,
        retry: 2,
        ...(queryOptions || {}),
    });

    return response;
};

export default useRequest;
