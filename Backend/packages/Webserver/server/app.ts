import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ProofRouter } from '@gac/whitelist';
import { getBalanceRouter } from '@gac/token';
import { getLoginRouter, discordAuthMiddleware } from '@gac/login';
import {
    getListingRouter,
    getTransactionRouter,
    StartDatabase,
} from '@gac/marketplace';
import Web3 from 'web3';

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
} = process.env;

StartDatabase(
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

const web3 = new Web3(WEB3_PROVIDER);

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/proof', ProofRouter);
app.use('/balance', getBalanceRouter(UNB_TOKEN, GUILD_ID));

const { LoginRouter, client: Oauth2Client } = getLoginRouter(
    OAUTH_CLIENT_ID,
    OAUTH_SECRET,
    OAUTH_REDIRECT_URL,
    GUILD_ID
);

app.use('/login', LoginRouter);
app.use('/listing', getListingRouter(Oauth2Client, GUILD_ID, adminRoles));

// ALL AUTHENTICATED ROUTES
app.use(discordAuthMiddleware(Oauth2Client, GUILD_ID, adminRoles));

app.use(
    '/transaction',
    getTransactionRouter(UNB_TOKEN, GUILD_ID, JWT_PRIVATE, web3, TOKEN_ADDRESS)
);
export default app;
