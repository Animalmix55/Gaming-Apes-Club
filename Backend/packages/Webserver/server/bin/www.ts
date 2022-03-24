/* eslint-disable import/first */
/* eslint-disable no-console */
/**
 * Module dependencies.
 */
import { config } from 'dotenv';

config();

import throng from 'throng';
import http from 'http';
import startWorker from '../app';

const WORKERS = process.env.WEB_CONCURRENCY || 1;

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

const startServer: throng.WorkerCallback = (id, disconnect) => {
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

    const app = startWorker();
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

throng({ workers: WORKERS, lifetime: Infinity, start: startServer });
