//import express from 'express';
//import morgan from 'morgan';
//import routes from './routes';
//import logger from './utils/logger';
//import { errorMiddleware } from './utils/errorMiddleware';

// Code to fix issue caused while fetching API with self signed certificate
require('https').globalAgent.options.ca = require('ssl-root-cas').create();

// Monitoring using Instana

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const instana = require('instana-nodejs-sensor');

}

// End of Monitoring using Instana

const app = express();

logger.info('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));

// Connect all our routes to our application
app.use('/', routes);

app.use(errorMiddleware);

export default app;