import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes.js';
import logger from './logger.js';
import { ErrorResponse } from './response.js';

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Requests logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Routes and related middleware
app.use('/', router);

// Internal Server Error handler
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  return res.status(500).json(new ErrorResponse({ message: 'Internal Server Error' }));
});

export default app;