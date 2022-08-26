import { RequestResult, useRequest } from '@gac/shared-v2';
import axios from 'axios';
import React from 'react';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

export const FollowersKey = 'FOLLOWERS';

export const useTwitterFollowers = (
    twitterId: string | undefined
): RequestResult<number> => {
    const { api } = useGamingApeContext();

    const queryFn = React.useCallback(
        async (twitterId: string) => {
            if (!twitterId) return 0;
            if (!api) throw new Error('Missing api');

            const url = `${api}/twitter/followerCount?twitterId=${twitterId}`;
            const { data } = await axios.get(url);
            return data?.followers ?? 0;
        },
        [api]
    );

    const result = useRequest(queryFn, FollowersKey, [twitterId], {
        staleTime: 60 * 60 * 1000, // 5 mins
    });

    return result;
};

export default useTwitterFollowers;
