import Server from '../../registry/server.js';
import { RegistryError } from '../../utils/errors.js';

export class RegistryCommand {
  static async start() {
    try {
      Server.start();
    } catch (error: any) {
      throw new RegistryError(`Failed to start registry server: ${error.message}`);
    }
  }
}