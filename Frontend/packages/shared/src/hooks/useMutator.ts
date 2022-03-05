/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    useQueryClient,
    useMutation as useMutationRQ,
    UseMutationResult,
    QueryKey,
} from 'react-query';

export const useMutation = <TParams extends Array<any>, TReturn>(
    query: (...params: TParams) => Promise<TReturn>,
    targetKey: QueryKey,
    exact = false
): UseMutationResult<TReturn, unknown, TParams, unknown> => {
    const queryClient = useQueryClient();

    const queryFn = React.useCallback(
        (params: TParams) => query(...params),
        [query]
    );

    const result = useMutationRQ<TReturn, unknown, TParams>(queryFn, {
        onSuccess: (): void => {
            queryClient.invalidateQueries({
                queryKey: targetKey,
                exact,
            });
        },
    });

    return result;
};

export default useMutation;
