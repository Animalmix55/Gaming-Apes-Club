import { config } from 'dotenv';
import throng from 'throng';
import { worker, master } from './startup';

config();
throng({
    master,
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
    start: worker,
});
