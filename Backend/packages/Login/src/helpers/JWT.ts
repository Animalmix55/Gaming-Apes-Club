/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse, createJWT, verifyJWT } from '@gac/shared';
import { RequestHandler } from 'express';
import AuthLocals from '../models/AuthLocals';
import { TokenClaims } from '../models/TokenClaims';
import { isAdmin } from './DisordOauth2';

export const createUserJWT = (
    userClaims: TokenClaims,
    secret: string,
    expiresIn = '24h'
) => {
    return createJWT(userClaims, secret, expiresIn);
};

export const validateUserJWT = (token: string, secret: string) => {
    return verifyJWT<TokenClaims>(token, secret);
};

export const authMiddleware: <
    P = { [x: string]: string },
    ResBody extends BaseResponse = BaseResponse,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends AuthLocals = AuthLocals
>(
    tokenSecret: string,
    adminRoles: string[]
) => RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =
    (tokenSecret, adminRoles) => async (req, res, next) => {
        const { authorization } = req.headers;

        if (req.method === 'OPTIONS') {
            next();
            return;
        }

        if (!authorization) {
            res.status(403).send({ error: 'No credentials sent' } as never);
            return;
        }

        try {
            const token = authorization.replace('Bearer ', '');
            const claims = validateUserJWT(token, tokenSecret);

            const admin = isAdmin(claims.member, adminRoles);
            res.locals.user = claims;
            res.locals.isAdmin = admin;

            next();
        } catch (e) {
            res.status(401).send({ error: `Bad authorization: ${e}` } as never);
        }
    };
