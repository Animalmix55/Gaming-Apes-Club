import express from 'express';
import { BaseResponse } from '@gac/shared';
import { Member, User } from 'discord-oauth2';
import {
    generatureOath2Url,
    getGuildMember,
    getOauth2Client,
    getTokenFromCode,
    getUser,
} from '../helpers/DisordOauth2';
import { createUserJWT } from '../helpers/JWT';

interface GetResponse extends BaseResponse {
    loginUrl?: string;
}

interface PostRequest {
    code?: string;
}

interface PostResponse extends BaseResponse, Partial<User> {
    token?: string;
    member?: Member;
}

const SCOPE = ['email', 'identify', 'guilds.members.read'];

export const getLoginRouter = (
    clientId: string,
    clientSecret: string,
    redirectUrl: string,
    guildId: string,
    jwtSecret: string,
    oauthTimeout?: number,
    jwtExpiry = '24h'
) => {
    const LoginRouter = express.Router();
    const client = getOauth2Client(
        clientId,
        clientSecret,
        redirectUrl,
        oauthTimeout
    );

    LoginRouter.get<string, never, GetResponse, never, never>(
        '/',
        async (_, res) => {
            try {
                const oauthUrl = generatureOath2Url(client, SCOPE);

                res.status(200).send({ loginUrl: oauthUrl });
                return;
            } catch (e) {
                res.status(500).send({ error: String(e) });
            }
        }
    );

    LoginRouter.post<string, never, PostResponse, PostRequest, never>(
        '/',
        async (req, res) => {
            const { body } = req;
            const { code } = body;

            if (!code) {
                res.status(400).send({ error: 'Missing code' });
                return;
            }

            try {
                const { access_token } = await getTokenFromCode(
                    client,
                    code,
                    SCOPE,
                    'authorization_code'
                );

                const user = await getUser(client, access_token);
                const member = await getGuildMember(
                    client,
                    access_token,
                    guildId
                );

                const claims = { ...user, member };
                const token = createUserJWT(claims, jwtSecret, jwtExpiry);

                res.status(200).send({
                    token,
                    ...claims,
                });
                return;
            } catch (e) {
                res.status(500).send({ error: String(e) });
            }
        }
    );

    return { LoginRouter, client };
};

export default getLoginRouter;
