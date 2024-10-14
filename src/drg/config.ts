import { readFile } from 'fs/promises';
import { join } from 'path';
import dwn from '../utils/protocol.js';
export const CWD = process.cwd();
export const HOME = process.env.HOME;
export const DPM_PORT = process.env.PORT || 2092;

export const REGISTRY_DIR_NAME = '.registry';
export const REGISTRY_DIR = join(CWD, REGISTRY_DIR_NAME);

export const REGISTRY_PROCESS_NAME = 'registry.drpm.tools';
export const REGISTRY_PID_FILE = 'registry.pid';
export const REGISTRY_PID = await readFile(join(CWD, REGISTRY_PID_FILE), 'utf8') ?? process.pid ?? 0;
export const REGISTRY_URL = process.env.REGISTRY_URL || 'http://registry.drpm.tools.local';

export default {
  CWD,
  HOME,
  DPM_PORT,
  REGISTRY_PROCESS_NAME,
  REGISTRY_PID_FILE,
  REGISTRY_PID,
  REGISTRY_DIR,
  REGISTRY_DIR_NAME,
  REGISTRY_URL,
  DRL_READ_PROTOCOLS : `read/protocols/${Buffer.from(dwn.protocol).toString('base64url')}`,
  DPM_HOME           : `${HOME}/.dpm`,
  NPMRC              : `${HOME}/.npmrc`,
  LOCAL_NPMRC        : `${CWD}/.npmrc`,
  PREFIXES           : [
    `@dpm:registry=${REGISTRY_URL}`,
    `@dpk:registry=${REGISTRY_URL}`,
    `dpm:registry=${REGISTRY_URL}`,
    `dpk:registry=${REGISTRY_URL}`
  ],
};