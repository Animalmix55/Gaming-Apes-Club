import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ProofRouter } from '@gac/whitelist';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/proof', ProofRouter);
export default app;
