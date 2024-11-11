import { join } from 'path';
import { DrlUtils } from './utils/dwn/drl-utils.js';
import dwn from './utils/dwn/protocol.js';
import { homedir } from 'os';

export const DRPM_REGISTRY_PORT = process.env.PORT || '2092';
export const DRPM_REGISTRY_URL = `http://localhost:${DRPM_REGISTRY_PORT}`;
export const DRPM_REGISTRY_DIR = join(process.env.HOME || homedir(), '.drpm', 'registry');
export const DRPM_PROTOCOL_B64URL = DrlUtils.base64urlEncode(dwn.protocol);
export const DRL_PROTOCOL_PARAM = `read/protocols/${DRPM_PROTOCOL_B64URL ?? 'aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt'}`;
export const DRPM_VERSION_PREFIXES = ['~', '^', '<', '>', '<=', '>=', '=', '-', '@'];
export const DRPM_HOME = `${process.env.HOME}/.config/drpm`;
export const DRPM_PROFILE = `${DRPM_HOME}/profile.json`;
export const DRPM_ENCRYPTED_PROFILE = `${DRPM_HOME}/profile.enc`;
// ggignore-start
export const DEFAULT_PASSWORD = 'insecure correct horse battery staple';
export const DEFAULT_DWN_URL = 'https://dwn.drpm.tools';
export const DEFAULT_PROFILE = {
  name : '',
  dht     : {
    did            : undefined,
    dwnEndpoints   : undefined,
    web5DataPath   : undefined,
    password       : undefined,
    recoveryPhrase : undefined
  },
  web : {
    did            : undefined,
    dwnEndpoints   : undefined,
    web5DataPath   : undefined,
    password       : undefined,
    recoveryPhrase : undefined
  },
  btc : {
    did            : undefined,
    dwnEndpoints   : undefined,
    web5DataPath   : undefined,
    password       : undefined,
    recoveryPhrase : undefined
  }
};
// ggignore-end