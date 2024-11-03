import { RegistryError } from '../../utils/errors.js';
import { Logger } from '../../utils/logger.js';

export class RegistryCommand {
  static async start() {
    try {
      Logger.info('Starting registry server ...');
      const { Registry } = await import('../../registry/registry.js');
      const server = new Registry();
      server.start();
    } catch (error: any) {
      throw new RegistryError(`Failed to start registry server: ${error.message}`);
    }
  }
}