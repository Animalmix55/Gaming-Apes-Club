import { RequestResult, useRequest } from '@gac/shared-v2';
import axios from 'axios';
import React from 'react';

export const FollowersKey = 'FOLLOWERS';

export const useTwitterFollowers = (
    twitterId: string | undefined
): RequestResult<number | undefined> => {
    // https://api.twitter.com/2/users/[ID]?user.fields=public_metrics,[any other fields]
    const queryFn = React.useCallback(async (twitterId: string | undefined) => {
        if (!twitterId) return undefined;

        // const url = `https://api.twitter.com/2/users/${twitterId}?user.fields=public_metrics`;

        // const { data } = await axios.get(url);
        // console.log({ data });

        return 0;
    }, []);

    const result = useRequest(queryFn, FollowersKey, [twitterId], {
        staleTime: 60 * 60 * 1000, // 60 mins
    });

    return result;
};

export default useTwitterFollowers;
