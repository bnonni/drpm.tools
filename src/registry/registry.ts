import express, { Express } from 'express';
import http from 'http';

import handlers from './handlers.js';
import { Logger } from '../utils/logger.js';
import { DRPM_REGISTRY_URL } from '../config.js';

export class Registry {
  private app: Express;
  private server?: http.Server;
  private port: number | string;

  constructor(port: number | string = process.env.PORT || 2092) {
    this.app = express();
    this.port = this.normalizePort(port) as string;
    this.app.set('port', this.port);

    // Load configurations and middleware here
    this.loadConfigs();
    this.setupRoutes();
  }

  // Initialize configurations and middleware
  private loadConfigs(): void {
    // Load any middleware, CORS setup, etc.
    this.app.use(express.json());
  }

  // Define routes or import from external routes file
  private setupRoutes(): void {
    // Assuming registry has specific routes
    this.app.use(handlers);
  }

  // Start the server for development or production
  public start(): void {
    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));
  }

  // Normalize port for consistency
  private normalizePort(val: string | number): number | string | false {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    return isNaN(port) ? val : port >= 0 ? port : false;
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;
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

  private onListening(): void {
    Logger.log(`Listening on ${DRPM_REGISTRY_URL}`);
  }

  // Expose Express instance for external configuration if needed
  public getApp(): Express {
    return this.app;
  }
}
