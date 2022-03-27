import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import { ProofRouter } from '@gac/whitelist';
import { getBalanceRouter } from '@gac/token';
import { getLoginRouter, authMiddleware } from '@gac/login';
import {
    getListingRouter,
    getRolesRouter,
    getTransactionRouter,
    StartDatabase,
} from '@gac/marketplace';
import Web3 from 'web3';
import cors from 'cors';

const start = async () => {
    const {
        MYSQL_HOST,
        MYSQL_PORT,
        MYSQL_USER,
        MYSQL_PASSWORD,
        MYSQL_DATABASE,
        UNB_TOKEN,
        GUILD_ID,
        ADMIN_ROLES,
        OAUTH_CLIENT_ID,
        OAUTH_SECRET,
        OAUTH_REDIRECT_URL,
        WEB3_PROVIDER,
        TOKEN_ADDRESS,
        JWT_PRIVATE,
        DISCORD_BOT_TOKEN,
        TRANSACTION_CHANNEL,
    } = process.env;

    const sequelize = await StartDatabase(
        String(MYSQL_HOST),
        Number(MYSQL_PORT),
        String(MYSQL_DATABASE),
        String(MYSQL_USER),
        String(MYSQL_PASSWORD)
    );

    const adminRoles = ADMIN_ROLES?.split(' ') || [];
    if (!GUILD_ID) throw new Error('Missing guild id');
    if (!UNB_TOKEN) throw new Error('Missing UNB Token');
    if (!WEB3_PROVIDER) throw new Error('Missing Web3 provider');
    if (!TOKEN_ADDRESS) throw new Error('Missing token address');
    if (!JWT_PRIVATE) throw new Error('Missing JWT private');
    if (!OAUTH_CLIENT_ID) throw new Error('Missing OAUTH client id');
    if (!OAUTH_SECRET) throw new Error('Missing OAUTH client private');
    if (!OAUTH_REDIRECT_URL) throw new Error('Missing OAUTH redirect url');
    if (!DISCORD_BOT_TOKEN) throw new Error('Missing Discord bot token');
    if (!TRANSACTION_CHANNEL)
        throw new Error('Missing Discord transaction channel');

    const web3 = new Web3(WEB3_PROVIDER);

    const app = express();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

    // app.use('/proof', ProofRouter); // no more whitelist for now...
    app.use('/balance', getBalanceRouter(UNB_TOKEN, GUILD_ID));

    const { LoginRouter } = getLoginRouter(
        OAUTH_CLIENT_ID,
        OAUTH_SECRET,
        OAUTH_REDIRECT_URL,
        GUILD_ID,
        JWT_PRIVATE
    );

    app.use('/login', LoginRouter);
    app.use('/roles', await getRolesRouter(DISCORD_BOT_TOKEN, GUILD_ID));
    app.use('/listing', getListingRouter(JWT_PRIVATE, adminRoles, sequelize));

    // ALL AUTHENTICATED ROUTES
    app.use(authMiddleware(JWT_PRIVATE, adminRoles));

    app.use(
        '/transaction',
        await getTransactionRouter(
            UNB_TOKEN,
            GUILD_ID,
            JWT_PRIVATE,
            web3,
            TOKEN_ADDRESS,
            DISCORD_BOT_TOKEN,
            TRANSACTION_CHANNEL
        )
    );

    return app;
};

export default start;
