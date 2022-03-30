/* eslint-disable @typescript-eslint/no-explicit-any */
import DiscordOauth2, { Member } from 'discord-oauth2';
import crypto from 'crypto';

export const getOauth2Client = (
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    requestTimeout?: number
) => {
    return new DiscordOauth2({
        clientId,
        clientSecret,
        requestTimeout,
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

export const isAdmin = (member: Member, adminRoles?: string[]) => {
    if (!adminRoles) return false;
    return member.roles.some((r) => adminRoles.includes(r));
};
