import express from 'express';
import { BaseResponse, getClient, getGuildMember } from '@gac/shared';
import { Member, User } from 'discord-oauth2';
import { GuildMember, Intents } from 'discord.js';
import {
    generatureOath2Url,
    getOauth2Client,
    getTokenFromCode,
    getUser,
} from '../helpers/DisordOauth2';
import { createUserJWT } from '../helpers/JWT';
import { TokenClaims } from '../models/TokenClaims';

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

export const getLoginRouter = async (
    clientId: string,
    clientSecret: string,
    redirectUrl: string,
    guildId: string,
    jwtSecret: string,
    discordBotToken: string,
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
    const discordjsClient = await getClient(discordBotToken, [
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
    ]);

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
                return res.status(400).send({ error: 'Missing code' });
            }

            let access_token: string;
            console.log(`Logging in new user at ip ${req.ip}`);
            try {
                ({ access_token } = await getTokenFromCode(
                    client,
                    code,
                    SCOPE,
                    'authorization_code'
                ));
            } catch (e) {
                console.error(`Failed to login user at ${req.ip}`, e);
                return res.status(400).send({ error: 'Failed to login' });
            }

            console.log(
                `User at ${req.ip} has retrieved an access token. Loading user data from discord.`
            );

            let user: User;
            try {
                user = await getUser(client, access_token);
            } catch (e) {
                console.error(
                    `Failed to load user data for user at ${req.ip}`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to load user data' });
            }

            console.log(
                `Fetched user data for ip ${req.ip}, loaded user ${user.username} (${user.id}). Loading guild membership.`
            );

            let member: GuildMember;
            try {
                member = await getGuildMember(
                    discordjsClient,
                    user.id,
                    guildId
                );
            } catch (e) {
                console.error(
                    `Failed to load guild membership for ${user.username} (${user.id}).`,
                    e
                );
                return res
                    .status(500)
                    .send({ error: 'Failed to load guild membership' });
            }

            const roles: string[] = [];
            member.roles.cache.forEach((role) => {
                roles.push(role.id);
            });

            console.log(`Creating JWT for user ${user.username} (${user.id})`);
            const claims: TokenClaims = {
                ...user,
                member: {
                    nick: member.nickname,
                    joined_at: member.joinedAt?.valueOf() || 0,
                    roles,
                    deaf: !!member.voice.deaf,
                    mute: !!member.voice.mute,
                    pending: member.pending,
                    is_pending: member.pending,
                    communication_disabled_until:
                        member.communicationDisabledUntil?.toISOString(),
                },
            };
            const token = createUserJWT(claims, jwtSecret, jwtExpiry);

            console.log(
                `Responding to user ${user.username} (${user.id}) with new token.`
            );
            return res.status(200).send({
                token,
                ...claims,
            });
        }
    );

    return { LoginRouter, client };
};

export default getLoginRouter;
