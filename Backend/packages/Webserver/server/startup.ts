import { getLoginRouter, authMiddleware } from '@gac/login';
import {
    StartDatabase,
    getRolesRouter,
    getListingRouter,
    getTagsRouter,
    getTransactionRouter,
} from '@gac/marketplace';
import { getBalanceRouter } from '@gac/token';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import Web3 from 'web3';
import logger from 'morgan';
import http from 'http';
import { WebsocketProvider } from 'web3-core';
import { BlockHeader } from 'web3-eth';
import { registerListeners } from '@gac/blockchain';

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): string | number | boolean {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const getNewProvider = (providerUri: string) => {
    const provider = new Web3.providers.WebsocketProvider(providerUri, {
        timeout: 10000, // 10s
        reconnect: {
            auto: true,
            delay: 2000, // 2s
            onTimeout: true,
            maxAttempts: 5,
        },
    });

    provider.on('connect', () => {
        console.log(`Websocket connection (re)established to ${providerUri}`);
    });
    provider.on('error', ((err: Error) =>
        console.log(
            'Web3 provider experienced an error',
            err.message
        )) as never);
    provider.on('end', () => console.log('Web3 connection ended'));

    if (!provider.supportsSubscriptions())
        throw new Error('Web3 provider does not support event subscriptions');

    return provider;
};

const TWO_MINS = 2 * 60 * 1000;
const THREE_MINS = 3 * 60 * 1000;

const getWeb3 = (
    providerUri: string,
    onBlockMined?: (block: BlockHeader) => void
) => {
    let lastBlock = Date.now();
    const web3 = new Web3(getNewProvider(providerUri));

    web3.eth.subscribe('newBlockHeaders', (err, result) => {
        if (!err) {
            lastBlock = Date.now();
            if (onBlockMined) onBlockMined(result);
        }
    });

    const checkIsActive = () => {
        console.log('Verifying connection is still active');
        const timeSinceLastBlock = Date.now() - lastBlock;
        if (
            timeSinceLastBlock > TWO_MINS ||
            !(web3.currentProvider as WebsocketProvider).connected
        ) {
            // 2 minutes
            (web3.currentProvider as WebsocketProvider).disconnect(
                1012, // service restart
                'Replaced'
            );
            console.error('Web3 connection was lost, reconnecting');
            web3.setProvider(getNewProvider(providerUri));
        }
        console.log(
            `Connection is still active, last block mined ${timeSinceLastBlock}ms ago`
        );
    };
    setInterval(checkIsActive, THREE_MINS);

    return web3;
};

const startExpressInstance = async () => {
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
        REQUEST_TIMEOUT,
        WEB3_PROVIDER,
        TOKEN_ADDRESS,
        JWT_PRIVATE,
        DISCORD_BOT_TOKEN,
        TRANSACTION_CHANNEL,
        JWT_EXPIRY,
        NUM_PROXIES,
        DEFAULT_TRANSACTION_MESSAGE,
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
    if (!DEFAULT_TRANSACTION_MESSAGE)
        throw new Error('Missing default Discord transaction message');
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
    if (!NUM_PROXIES) throw new Error('Number of proxies not supplied');

    const REQUEST_NUMERIC_TIMEOUT = Number(REQUEST_TIMEOUT || 5000); // default 5000 ms
    if (Number.isNaN(REQUEST_NUMERIC_TIMEOUT))
        throw new Error(`Bad timeout: ${REQUEST_TIMEOUT}`);

    const NUMERIC_NUM_PROXIES = Number(NUM_PROXIES);
    if (Number.isNaN(NUMERIC_NUM_PROXIES))
        throw new Error('Invalid number of proxies');

    const web3 = new Web3(WEB3_PROVIDER);

    const app = express();
    app.set('trust proxy', NUMERIC_NUM_PROXIES);

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

    // app.use('/proof', ProofRouter); // no more whitelist for now...
    app.use('/balance', getBalanceRouter(UNB_TOKEN, GUILD_ID));

    const { LoginRouter } = await getLoginRouter(
        OAUTH_CLIENT_ID,
        OAUTH_SECRET,
        OAUTH_REDIRECT_URL,
        GUILD_ID,
        JWT_PRIVATE,
        DISCORD_BOT_TOKEN,
        REQUEST_NUMERIC_TIMEOUT,
        JWT_EXPIRY // default 24h
    );

    app.use('/login', LoginRouter);
    app.use('/roles', await getRolesRouter(DISCORD_BOT_TOKEN, GUILD_ID));
    app.use('/listing', getListingRouter(JWT_PRIVATE, adminRoles, sequelize));
    app.use('/tags', getTagsRouter());

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
            TRANSACTION_CHANNEL,
            sequelize,
            DEFAULT_TRANSACTION_MESSAGE
        )
    );

    return app;
};

export const worker: throng.WorkerCallback = async (id, disconnect) => {
    console.log(`Starting worker ${id}`);

    /**
     * Get port from environment and store in Express.
     */
    const port = normalizePort(process.env.PORT || '3000');

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    const app = await startExpressInstance();
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);

    function shutdown() {
        console.log(`Worker ${id} cleanup.`);
        disconnect();
    }

    process.once('SIGTERM', shutdown);
    process.once('SIGINT', shutdown);
};

export const master = async () => {
    console.log('Starting webserver...');

    const {
        POLYGON_WEB3_PROVIDER,
        GACSTAKINGANCILARY_ADDRESS,
        MYSQL_HOST,
        MYSQL_PORT,
        MYSQL_DATABASE,
        MYSQL_USER,
        MYSQL_PASSWORD,
        UNB_TOKEN,
        GUILD_ID,
    } = process.env;

    if (!POLYGON_WEB3_PROVIDER) throw new Error('Missing polygon provider');
    if (!GACSTAKINGANCILARY_ADDRESS)
        throw new Error('Missing GAC STAKING ANCILARY Address');
    if (!UNB_TOKEN || !GUILD_ID)
        throw new Error('Missing Discord data for UNB');

    const sequelize = await StartDatabase(
        String(MYSQL_HOST),
        Number(MYSQL_PORT),
        String(MYSQL_DATABASE),
        String(MYSQL_USER),
        String(MYSQL_PASSWORD)
    );

    const polygonWeb3 = getWeb3(POLYGON_WEB3_PROVIDER, (block) => {
        if (block.number % 300 === 0)
            console.log(
                `Received new block header divisible by 300: ${block.number}`
            );
    });

    await registerListeners(
        polygonWeb3,
        GACSTAKINGANCILARY_ADDRESS,
        UNB_TOKEN,
        GUILD_ID,
        sequelize
    );
};
