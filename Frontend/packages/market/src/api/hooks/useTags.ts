import React from 'react';
import { RequestResult, useRequest } from '@gac/shared';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { TagsGetResponse, TagRequests } from '../Requests';

export const TagsKey = 'TAGS';

export const useTags = (
    hideUnused?: boolean
): RequestResult<TagsGetResponse> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        (hideUnused?: boolean) => {
            if (!api) throw new Error('Missing api');

            return TagRequests.get(api, hideUnused);
        },
        [api]
    );

    const result = useRequest(queryFn, TagsKey, [hideUnused], {
        staleTime: Infinity,
    });

    return result;
};
