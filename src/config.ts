import { readFile } from 'fs/promises';
import { userInfo } from 'os';
import { join } from 'path';
import { DrlUtils } from './utils/dwn/drl-utils.js';
import dwn from './utils/dwn/protocol.js';
import { Logger } from './utils/logger.js';

const parsePackageJson = async () => JSON.parse(await readFile(NPM_PACKAGE_JSON_PATH, 'utf8'));

export const CWD = process.cwd();
export const NPM_PACKAGE_JSON_PATH = process.env.npm_package_json || join(CWD, 'package.json');
export const NPM_PACKAGE_JSON = await parsePackageJson().catch(Logger.error);
export const PACKAGE_VERSION = NPM_PACKAGE_JSON?.version ?? '1.0.0';

export const DRPM_REGISTRY_URL = `http://localhost:2092`;
export const DRPM_DWN_URL = 'https://dwn.drpm.tools';


export const DRPM_HOME = `${CWD}/.drpm`;
export const DRPM_REGISTRY_DIR = join(DRPM_HOME, 'registry');
export const DRPM_PROTOCOL_B64URL = DrlUtils.base64urlEncode(dwn.protocol);
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;
export const DRPM_VERSION_PREFIXES = ['~', '^', '<', '>', '<=', '>=', '=', '-', '@'];