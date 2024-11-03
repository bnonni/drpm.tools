// import { DWeb5 } from '../drpm/dweb5.js';
// import { DManager } from '../utils/dpk/manager.js';
import { Registry } from './registry.js';

const server = new Registry();

if (import.meta.url === `file://${process.argv[1]}`) {
  // const { web5, did } = await DWeb5.connect();
  // DManager.web5 = web5;
  // DManager.did = did;
  server.start();
}

export default server;
