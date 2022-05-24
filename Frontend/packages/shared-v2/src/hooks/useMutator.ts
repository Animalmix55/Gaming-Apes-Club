/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    useMutation as useMutationRQ,
    UseMutationResult,
    UseMutationOptions,
} from 'react-query';

export const useMutation = <TParams extends Array<any>, TReturn>(
    query: (...params: TParams) => Promise<TReturn>,
    options: Omit<
        UseMutationOptions<TReturn, unknown, TParams, unknown>,
        'mutationFn'
    >
): UseMutationResult<TReturn, unknown, TParams, unknown> => {
    const queryFn = React.useCallback(
        (params: TParams) => query(...params),
        [query]
    );

    const result = useMutationRQ<TReturn, unknown, TParams>(queryFn, options);

    return result;
};

export default useMutation;
