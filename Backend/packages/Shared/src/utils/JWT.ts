import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/ban-types
export const createJWT = <TPayload extends string | object | Buffer>(
    payload: TPayload,
    secret: string,
    expiresIn = '1hr'
): string => {
    return jwt.sign(payload, secret, { expiresIn });
};

/**
 * @throws error if token not valid.
 * @param token the jwt to validate.
 * @param secret the secret to use to validate.
 * @returns the payload held by the token.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const verifyJWT = <TPayload extends string | object | Buffer>(
    token: string,
    secret: string
): TPayload => {
    const result = jwt.verify(token, secret);

    return result as TPayload;
};
