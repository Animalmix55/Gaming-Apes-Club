import { BaseResponse, getClient } from '@gac/shared';
import express from 'express';
import { getRolesById } from '../utils/Discord';

interface GetResponse extends BaseResponse {
    results: Record<string, string>;
}

export const getRolesRouter = async (
    discordBotToken: string,
    guildId: string
) => {
    const discordClient = await getClient(discordBotToken, []);

    let cacheTime: number | undefined;
    let cacheValue: Record<string, string>;

    const getRoles = async () => {
        const curTime = Date.now();

        try {
            if (
                cacheTime === undefined ||
                cacheValue === undefined ||
                curTime - cacheTime > 5 * 60 * 1000
            )
                // 5 min cache
                cacheValue = await getRolesById(discordClient, guildId);
            return cacheValue;
        } catch (e) {
            console.error('Failed to populate discord role cache', e);

            if (cacheValue) return cacheValue;
            throw new Error('Could not retrieve roles');
        }
    };

    getRoles();

    const RolesRouter = express.Router();

    // GET
    RolesRouter.get<string, never, GetResponse, never, never, never>(
        '/',
        async (_, res) => {
            return res.status(200).send({ results: await getRoles() });
        }
    );

    return RolesRouter;
};

export default getRolesRouter;
