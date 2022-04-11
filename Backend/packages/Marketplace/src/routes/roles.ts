import { BaseResponse, getClient } from '@gac/shared';
import express from 'express';
import { getRolesById } from '../utils/Discord';

interface GetResponse extends BaseResponse {
    results?: Record<string, string>;
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
        async (req, res) => {
            try {
                const roles = await getRoles();
                return res.status(200).send({ results: roles });
            } catch (e) {
                console.error(`Role retrieval by ${req.ip} failed`, e);
                return res
                    .status(500)
                    .send({ error: 'Failed to retrieve roles' });
            }
        }
    );

    return RolesRouter;
};

export default getRolesRouter;
