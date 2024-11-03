import { Registry } from '../../registry/registry.js';

export class DrpmRegistry {
  static async start() {
    const registry = new Registry();
    registry.start();
  }
}