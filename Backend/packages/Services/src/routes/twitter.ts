import express from 'express';
import { BaseResponse } from '@gac/shared';
import axios from 'axios';

interface GetRequest {
    twitterId: string;
}

interface FollowersResponse extends BaseResponse {
    followers?: number;
}

export const getTwitterRouter = (twitterBearerToken: string) => {
    const TwitterRouter = express.Router();

    TwitterRouter.get<string, never, FollowersResponse, never, GetRequest>(
        '/followerCount',
        async (req, res) => {
            const { query } = req;
            const { twitterId } = query;

            if (!twitterId)
                return res.status(400).send({ error: 'Missing twitter id' });

            try {
                const { data } = await axios.get(
                    `https://api.twitter.com/2/users/by/username/${twitterId}?user.fields=public_metrics`,
                    {
                        headers: {
                            Authorization: `Bearer ${twitterBearerToken}`,
                        },
                    }
                );

                return res.status(200).send({
                    followers: data?.data?.public_metrics?.followers_count,
                });
            } catch (e) {
                console.error(`Failed to fetch followers for ${twitterId}`, e);
                return res
                    .status(500)
                    .send({ error: 'Failed to retrieve followers' });
            }
        }
    );

    return TwitterRouter;
};

export default getTwitterRouter;
