import { join } from 'path';
import { DrlUtils } from './utils/dwn/drl-utils.js';
import dwn from './utils/dwn/protocol.js';
import { homedir } from 'os';

export const DRPM_REGISTRY_PORT = process.env.PORT || '2092';
export const DRPM_REGISTRY_URL = `http://localhost:${DRPM_REGISTRY_PORT}`;
export const DRPM_REGISTRY_DIR = join(process.env.HOME || homedir(), '.drpm', 'registry');
export const DRPM_PROTOCOL_B64URL = DrlUtils.base64urlEncode(dwn.protocol);
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL}`;
export const DRPM_VERSION_PREFIXES = ['~', '^', '<', '>', '<=', '>=', '=', '-', '@'];
export const DRPM_HOME = `${process.env.HOME || homedir()}/.config/drpm`;
export const DRPM_PROFILE = `${DRPM_HOME}/profile.json`;
export const DEFAULT_WEB5DATAPATH = `${DRPM_HOME}/DATA`;
// ggignore-start
export const DEFAULT_PASSWORD = 'insecure correct horse battery staple';
export const DEFAULT_RECOVERY_PHRASE = 'correct horse battle stable correct horse battle stable correct horse battle stable';
export const DEFAULT_DWN_URL = 'https://dwn.drpm.tools';
export const DEFAULT_PROFILE = {
  default : 'dht',
  dht     : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : DEFAULT_RECOVERY_PHRASE,
    password       : DEFAULT_PASSWORD
  },
  web : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : DEFAULT_RECOVERY_PHRASE,
    password       : DEFAULT_PASSWORD
  },
  btc : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : DEFAULT_RECOVERY_PHRASE,
    password       : DEFAULT_PASSWORD
  }
};
// ggignore-end