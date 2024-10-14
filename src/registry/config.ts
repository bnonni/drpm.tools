import { readFile } from 'fs/promises';
import { join } from 'path';
import dwn from '../protocol.js';
export const CWD = process.cwd();
export const HOME = process.env.HOME;
export const DPM_PORT = process.env.PORT || 2092;

export const REGISTRY_NAME = 'registry.drpm.tools.local';
export const REGISTRY_DIR = '.registryd';
export const REGISTRY_PID = 'registryd.pid';
export const DPM_REGISTRY = 'dpm:registry';
export const DPK_REGISTRY = 'dpk:registry';
export const DPM_HOME = `${HOME}/.dpm`;
export const NPMRC_GLOBAL = `${HOME}/.npmrc`;
export const NPMRC_LOCAL = `${CWD}/.npmrc`;
export const REGISTRY_URL = process.env.REGISTRY_URL || `http://${REGISTRY_NAME}`;
export const REGISTRY_PREFIXES = [
  `@${DPM_REGISTRY}=${REGISTRY_URL}`,
  `@${DPK_REGISTRY}=${REGISTRY_URL}`,
  `${DPM_REGISTRY}=${REGISTRY_URL}`,
  `${DPK_REGISTRY}=${REGISTRY_URL}`
];
export const REGISTRY_DIR_PATH = join(CWD, REGISTRY_DIR);
export const REGISTRY_PID_PATH = await readFile(join(CWD, REGISTRY_PID), 'utf8') ?? process.pid ?? 0;
export const DRPM_PROTOCOL_B64URL = Buffer.from(dwn.protocol).toString('base64url');
export const DWN_DRL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;

export default {
  CWD,
  HOME,
  DPM_PORT,
  REGISTRY_NAME,
  REGISTRY_URL,
  REGISTRY_PID,
  REGISTRY_PID_PATH,
  REGISTRY_DIR,
  REGISTRY_DIR_PATH,
  DRPM_PROTOCOL_B64URL,
  DWN_DRL_PARAM,
  DPM_HOME,
  NPMRC_GLOBAL,
  NPMRC_LOCAL,
  REGISTRY_PREFIXES
};