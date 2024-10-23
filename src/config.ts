import { appendFile, readFile } from 'fs/promises';
import { homedir, userInfo } from 'os';
import { join } from 'path';
import { DrlUtils } from './utils/dwn/drl-utils.js';
import dwn from './utils/dwn/protocol.js';
import { Logger } from './utils/logger.js';

const parsePackageJson = async () => JSON.parse(await readFile(NPM_PACKAGE_JSON_PATH, 'utf8'));
const ensureFileData = async () => {
  await appendFile(REGISTRYD_PID_FILE, (process.ppid ?? 0).toString());
  return await readFile(REGISTRYD_PID_FILE, 'utf8');
};

export const CWD = process.cwd();
export const HOME = process.env.HOME || homedir();
export const NPM_PACKAGE_JSON_PATH = process.env.npm_package_json || join(CWD, 'package.json');
export const NPM_PACKAGE_JSON = await parsePackageJson().catch(Logger.error);
export const PACKAGE_VERSION = NPM_PACKAGE_JSON?.version ?? '1.0.0';
export const DRPM_PORT = process.env.DRPM_DRG_PORT_DEFAULT || process.env.PORT || 2092;
export const DRPM_HOME = process.env.DRPM_HOME || `${HOME}/.drpm`;
export const DRG_HOSTNAME = `localhost`;
// process.env.DRPM_DRG_HOSTNAME || 'local.drpm.tools';
export const DRPM_DRG_URL = `http://${DRG_HOSTNAME}:${DRPM_PORT}`;
// process.env.DRPM_DRG_URL ||
export const DRG_PREFIX = process.env.DRPM_DRG_PREFIX || 'drpm:registry';

export const GLOBAL_NPMRC_FILE = process.env.npm_config_globalconfig || process.env.GLOBAL_NPMRC_FILE || `${HOME}/.npmrc`;
export const LOCAL_NPMRC_FILE = process.env.LOCAL_NPMRC_FILE || `${CWD}/.npmrc`;
export const GLOBAL_DRPMRC_FILE = process.env.GLOBAL_DRPMRC_FILE || `${DRPM_HOME}/.drpmrc`;
export const LOCAL_DRPMRC_FILE = process.env.LOCAL_DRPMRC_FILE || `${CWD}/.drpmrc`;

export const NPMRC_PREFIXES = process.env.DRPM_NPMRC_PREFIXES || [
  `@${DRG_PREFIX}=${DRPM_DRG_URL}`,
  `${DRG_PREFIX}=${DRPM_DRG_URL}`,
];
export const DRPM_DRG_DIR = process.env.DRPM_DRG_DIR || join(DRPM_HOME, `@drg`);
export const REGISTRYD_PID_FILE = join(DRPM_HOME, 'registryd.pid');
export const REGISTRYD_PID = await readFile(REGISTRYD_PID_FILE, 'utf8').catch(ensureFileData);
export const DRPM_PROTOCOL = dwn.protocol ?? 'https://drpm.tools/protocols/drpm';
export const DRPM_PROTOCOL_B64URL = DrlUtils.base64urlEncode(DRPM_PROTOCOL) ?? 'aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt';
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;
export const DPK_VERSION_PREFIXES = ['~', '^', '<', '>', '<=', '>=', '=', '-', '@'];
export const DRPM_DWN_URL = 'https://dwn.drpm.tools';
export const DWN_LOCAL_PORT = 3000;
export const DWN_LOCAL_URL = `http://localhost:${DWN_LOCAL_PORT}`;
export const DRPM_HOME_BAK_DIR = `${DRPM_HOME}/bak`;
export const DRPM_USER = userInfo()?.username;
export const DEFAULT_DATAPATH = join(DRPM_HOME, 'DATA');
export const DRPM_PROFILE_PATH = join(DRPM_HOME, '.drpm_profile');
export const DEFAULT_PASSWORD = 'insecure-static-password';
export const DEFAULT_PROFILE = {
  did            : '',
  dwnEndpoints   : [],
  recoveryPhrase : '',
  password       : DEFAULT_PASSWORD,
  web5DataPath   : DEFAULT_DATAPATH,
};

export default {
  CWD,
  HOME,
  DRPM_PORT,
  DRPM_HOME,
  DRG_HOSTNAME,
  DRPM_DWN_URL,
  DRPM_DRG_URL,
  GLOBAL_NPMRC_FILE,
  LOCAL_NPMRC_FILE,
  GLOBAL_DRPMRC_FILE,
  LOCAL_DRPMRC_FILE,
  REGISTRYD_PID,
  REGISTRYD_PID_FILE,
  DRPM_DRG_DIR,
  DRPM_PROTOCOL_B64URL,
  DRL_PROTOCOL_PARAM,
  NPMRC_PREFIXES,
  DWN_LOCAL_PORT,
  DWN_LOCAL_URL,
  DRPM_USER,
  DEFAULT_DATAPATH,
  DRPM_HOME_BAK_DIR,
  DRPM_PROFILE_PATH,
  DEFAULT_PROFILE
};