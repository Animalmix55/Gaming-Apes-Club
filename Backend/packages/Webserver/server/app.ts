import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ProofRouter } from '@gac/whitelist';
import { getBalanceRouter } from '@gac/token';
import { getLoginRouter, discordAuthMiddleware } from '@gac/login';
import { getMarketplaceRouter } from '@gac/marketplace';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/proof', ProofRouter);
app.use(
    '/balance',
    getBalanceRouter(process.env.UNB_TOKEN, process.env.GUILD_ID)
);

const { LoginRouter, client: Oauth2Client } = getLoginRouter(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_SECRET,
    process.env.OAUTH_REDIRECT_URL,
    process.env.GUILD_ID
);

app.use('/login', LoginRouter);

// ALL AUTHENTICATED ROUTES
app.use(discordAuthMiddleware(Oauth2Client));

app.use('/purchase', getMarketplaceRouter());
export default app;
