import { readFile } from 'fs/promises';
import { join } from 'path';
import dwn from './utils/protocol.js';

export const CWD = process.cwd();
export const HOME = process.env.HOME;
export const DRPM_PORT = process.env.PORT || 2092;
export const DRPM_HOME = `${HOME}/.drpm`;
export const DRG_HOSTNAME = 'local.drg.drpm.tools';
export const DRPM_DWN_URL = 'https://dwn.drpm.tools/';
export const DRG_URL = process.env.DRG_URL || `http://${DRG_HOSTNAME}`;
export const DRG_PREFIX = 'drg:registry';
export const DPK_PREFIX = 'dpk:registry';
export const NPMRC_GLOBAL = `${HOME}/.npmrc`;
export const NPMRC_LOCAL = `${CWD}/.npmrc`;
export const REGISTRYD_PREFIXES = [
  `@${DRG_PREFIX}=${DRG_URL}`,
  `${DRG_PREFIX}=${DRG_URL}`,
  `@${DPK_PREFIX}=${DRG_URL}`,
  `${DPK_PREFIX}=${DRG_URL}`
];
export const DRG_DIR_NAME = `@drg`;
export const DRG_DIR_PATH = join(DRPM_HOME, DRG_DIR_NAME);
export const REGISTRYD_PID_FILE_NAME = 'registryd.pid';
export const REGISTRYD_PID_FILE_PATH = join(DRPM_HOME, REGISTRYD_PID_FILE_NAME);
export const REGISTRYD_PID = await readFile(REGISTRYD_PID_FILE_PATH, 'utf8') ?? process.ppid ?? 0;
export const DRPM_PROTOCOL_B64URL = Buffer.from(dwn.protocol).toString('base64url');
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;

export default {
  CWD,
  HOME,
  DRPM_PORT,
  DRG_HOSTNAME,
  DRG_URL,
  DRPM_DWN_URL,
  REGISTRYD_PID,
  REGISTRYD_PID_FILE_PATH,
  REGISTRYD_PID_FILE_NAME,
  DRG_DIR_NAME,
  DRG_DIR_PATH,
  DRPM_PROTOCOL_B64URL,
  DRL_PROTOCOL_PARAM,
  DRPM_HOME,
  NPMRC_GLOBAL,
  NPMRC_LOCAL,
  REGISTRYD_PREFIXES
};