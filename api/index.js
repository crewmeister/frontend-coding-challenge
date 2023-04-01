import app from './src/server.js';
import logger from './src/logger.js';

const PORT = 8080;

app.listen(PORT, () =>
  logger.info(`The Absence Manager API is running on: http://localhost:${PORT}.`)
);