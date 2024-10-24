import { readFile } from 'fs/promises';
import { homedir, userInfo } from 'os';
import { join } from 'path';
import { DrlUtils } from './utils/dwn/drl-utils.js';
import dwn from './utils/dwn/protocol.js';
import { Logger } from './utils/logger.js';
import { DPM5 } from './dpm/dpm5.js';
import { DidResolver } from './utils/did/resolver.js';

const parsePackageJson = async () => JSON.parse(await readFile(NPM_PACKAGE_JSON_PATH, 'utf8'));

export const CWD = process.cwd();
export const HOME = process.env.HOME || homedir();
export const NPM_PACKAGE_JSON_PATH = process.env.npm_package_json || join(CWD, 'package.json');
export const NPM_PACKAGE_JSON = await parsePackageJson().catch(Logger.error);
export const PACKAGE_VERSION = NPM_PACKAGE_JSON?.version ?? '1.0.0';
export const DRPM_PORT = process.env.PORT || 2092;
export const DRPM_HOME = `${HOME}/.drpm`;
export const DRG_HOSTNAME = 'localhost';
export const DRPM_DRG_URL = `http://${DRG_HOSTNAME}:${DRPM_PORT}`;
export const DRPM_PROFILE_LOCAL = `${CWD}/.drpm_profile`;
export const DRPM_PROFILE_GLOBAL = `${DRPM_HOME}/.drpm_profile`;
export const DRPM_REGISTRY_DIR = join(DRPM_HOME, 'registry');
export const DRPM_PROTOCOL = dwn.protocol ?? 'https://drpm.tools/protocols/drpm';
export const DRPM_PROTOCOL_B64URL = DrlUtils.base64urlEncode(DRPM_PROTOCOL) ?? 'aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt';
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;
export const DPK_VERSION_PREFIXES = ['~', '^', '<', '>', '<=', '>=', '=', '-', '@'];
export const DRPM_HOME_BAK_DIR = `${DRPM_HOME}/bak`;
export const DRPM_USER = userInfo()?.username;
export const DEFAULT_DATAPATH = join(DRPM_HOME, 'DATA', 'AGENT');
export const DEFAULT_PASSWORD = 'insecure-static-password';
export const DEFAULT_PROFILE = {
  did            : '',
  dwnEndpoints   : [],
  recoveryPhrase : '',
  password       : DEFAULT_PASSWORD,
  web5DataPath   : DEFAULT_DATAPATH,
};
export const { web5, did } = await DPM5.connect();
export const DRPM_DWN_URL = 'https://dwn.drpm.tools';
export async function getDwnEndpoints() {
  const { didDocument } = await DidResolver.resolve(did);
  Logger.info(`DManager: Resolved didDocument ${didDocument}`);
  const services = didDocument?.service;
  const didServiceEndpoint = services?.find(
    service => service.type === 'DecentralizedWebNode'
  )?.serviceEndpoint ?? (
    process.env.NODE_ENV === 'development'
      ? ['http://localhost:3000']
      : [DRPM_DWN_URL]
  );
  const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
  return serviceEndpoints.map(endpoint => endpoint.replace(/\/$/, ''));
}
export const DWN_ENDPOINTS = await getDwnEndpoints();