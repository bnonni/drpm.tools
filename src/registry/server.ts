import { Registry } from './registry.js';

const server = new Registry();

if (import.meta.url === `file://${process.argv[1]}`) {
  server.start();
}

export default server;
