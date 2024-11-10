import { ensureDir, ensureFile, exists } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { homedir, platform } from 'os';
import { join } from 'path';
import { Logger } from '../utils/logger.js';

const DRPM_DIR = 'drpm';
const CONFIG_DRPM_DIR = platform() === 'win32'
  ? join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), DRPM_DIR)
  : join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), DRPM_DIR);
const DRPM_BAK_DIR = join(CONFIG_DRPM_DIR, 'bak');
const DRPM_REGISTRYPID_FILE = join(CONFIG_DRPM_DIR, 'registry.pid');
const DRPM_REGISTRY_OUT_FILE = join(CONFIG_DRPM_DIR, 'registry.out');
const DRPM_VERSION_FILE = join(CONFIG_DRPM_DIR, '.version');
const DRPM_PROFILE = join(CONFIG_DRPM_DIR, 'profile.json');

export class Setup {
  public static async run(): Promise<void> {
    if (!await exists(CONFIG_DRPM_DIR)) {
      await ensureDir(CONFIG_DRPM_DIR);
      Logger.log(`DRPM .config dir created (${CONFIG_DRPM_DIR})`);
    }

    if (!await exists(DRPM_BAK_DIR)) {
      await ensureDir(DRPM_BAK_DIR);
      Logger.log(`DRPM .config/bak created (${DRPM_BAK_DIR})`);
    }

    if (!await exists(DRPM_REGISTRYPID_FILE)) {
      await ensureFile(DRPM_REGISTRYPID_FILE);
      Logger.log(`DRPM registry.pid created: ${DRPM_REGISTRYPID_FILE}`);
    }

    if (!await exists(DRPM_REGISTRY_OUT_FILE)) {
      await ensureFile(DRPM_REGISTRY_OUT_FILE);
      Logger.log(`DRPM registry.out created: ${DRPM_REGISTRY_OUT_FILE}`);
    }

    if (!await exists(DRPM_VERSION_FILE)) {
      await ensureFile(DRPM_VERSION_FILE);
      Logger.log(`DRPM .version created: ${DRPM_VERSION_FILE}`);
    }

    if (!await exists(DRPM_PROFILE)) {
      await writeFile(DRPM_PROFILE, `{
        "name": "",
        "dht": {
            "did": undefined,
            "dwnEndpoints": undefined,
            "web5DataPath": undefined,
            "password": undefined,
            "recoveryPhrase": undefined
        },
        "web": {
            "did": undefined,
            "dwnEndpoints": undefined,
            "web5DataPath": undefined,
            "password": undefined,
            "recoveryPhrase": undefined
        },
        "btc": {
            "did": undefined,
            "dwnEndpoints": undefined,
            "web5DataPath": undefined,
            "password": undefined,
            "recoveryPhrase": undefined
        }
    }`);
      Logger.log(`DRPM profile.json created: ${DRPM_PROFILE}`);
    }
    Logger.log(`DRPM Setup Complete!`);
  }
}