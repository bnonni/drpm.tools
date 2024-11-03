import { Registry } from './registry.js';

export default class Server {
  static start() {
    if (import.meta.url === `file://${process.argv[1]}`) {
      const registry = new Registry();
      registry.start();
    }
  }
}
