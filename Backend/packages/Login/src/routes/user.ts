import express from 'express';
import cors from 'cors';
import { BaseResponse } from '@gac/shared';
import {
    generatureOath2Url,
    getOauth2Client,
    getTokenFromCode,
} from '../helpers/DisordOauth2';

interface GetResponse extends BaseResponse {
    loginUrl?: string;
}

interface PostRequest {
    code?: string;
}

interface PostResponse extends BaseResponse {
    token?: string;
}

const SCOPE = ['email', 'guilds'];

export const getLoginRouter = (
    clientId?: string,
    clientSecret?: string,
    redirectUrl?: string
) => {
    if (!clientId || !clientSecret || !redirectUrl) {
        console.error('Missing client id, redirect uri, or secret');
        process.exit(1);
    }

    const LoginRouter = express.Router();
    const client = getOauth2Client(clientId, clientSecret, redirectUrl);

    LoginRouter.get<string, never, GetResponse, never, never>(
        '/',
        cors(),
        async (req, res) => {
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
        cors(),
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

                res.status(200).send({ token: access_token });
                return;
            } catch (e) {
                res.status(500).send({ error: String(e) });
            }
        }
    );

    return LoginRouter;
};

export default getLoginRouter;
