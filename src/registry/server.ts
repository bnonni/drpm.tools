#!/usr/bin/env node
import http from 'http';
import { Logger } from '../utils/logger.js';
import { DRPM_REGISTRY_URL } from '../config.js';
import registry from './index.js';
process.title = 'registry.drpm.tools';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort('2092');
registry.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(registry);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | false {
  const parsedPort = parseInt(val, 10);

  if (isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  Logger.log(`Listening on ${DRPM_REGISTRY_URL}`);
}
