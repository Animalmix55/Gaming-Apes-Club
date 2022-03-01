/* eslint-disable @typescript-eslint/no-explicit-any */
import DiscordOauth2, { Member } from 'discord-oauth2';
import crypto from 'crypto';
import { RequestHandler } from 'express';
import { BaseResponse } from '@gac/shared';
import AuthLocals from '../models/AuthLocals';

export const getOauth2Client = (
    clientId: string,
    clientSecret: string,
    redirectUri: string
) => {
    return new DiscordOauth2({
        clientId,
        clientSecret,
        redirectUri,
    });
};

export const getTokenFromCode = (
    client: DiscordOauth2,
    code: string,
    scope: string[],
    grantType: 'authorization_code' | 'refresh_token'
) => {
    return client.tokenRequest({
        code,
        scope,
        grantType,
    });
};

/**
 * Returns a promise which resolves in an empty object if successful.
 */
export const revokeToken = (
    client: DiscordOauth2,
    clientId: string,
    clientSecret: string,
    token: string
) => {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
        'base64'
    );

    return client.revokeToken(token, credentials);
};

export const getUser = (client: DiscordOauth2, token: string) => {
    return client.getUser(token);
};

export const getGuildMember = (
    client: DiscordOauth2,
    token: string,
    guildId: string
) => {
    return client.getGuildMember(token, guildId);
};

/**
 * Generates an OATH2 url
 */
export const generatureOath2Url = (client: DiscordOauth2, scope: string[]) => {
    return client.generateAuthUrl({
        scope,
        state: crypto.randomBytes(16).toString('hex'),
    });
};

const isAdmin = (member: Member, adminRoles?: string[]) => {
    if (!adminRoles) return false;
    return member.roles.some((r) => adminRoles.includes(r));
};

export const discordAuthMiddleware: <
    P = { [x: string]: string },
    ResBody extends BaseResponse = BaseResponse,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends AuthLocals = AuthLocals
>(
    client: DiscordOauth2,
    guildId: string,
    adminRoles: string[]
) => RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =
    (client, guildId, adminRoles) => async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            res.status(403).send({ error: 'No credentials sent' } as never);
            return;
        }

        try {
            const token = authorization.replace('Bearer ', '');
            const user = await getUser(client, token);
            const member = await getGuildMember(client, token, guildId);
            const admin = isAdmin(member, adminRoles);
            res.locals.user = { ...user, member };
            res.locals.isAdmin = admin;

            next();
        } catch (e) {
            res.status(401).send({ error: `Bad authorization: ${e}` } as never);
        }
    };
