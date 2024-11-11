import { ensureDir, ensureFile, exists, existsSync } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { homedir, platform } from 'os';
import { join } from 'path';
import { Logger } from '../utils/logger.js';

const DRPM_DIR = 'drpm';
const DRPM_CONFIG_DIR = platform() === 'win32'
  ? join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), DRPM_DIR)
  : join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), DRPM_DIR);
const DRPM_BAK_DIR = join(DRPM_CONFIG_DIR, 'bak');
const DRPM_REGISTRYPID_FILE = join(DRPM_CONFIG_DIR, 'registry.pid');
const DRPM_REGISTRY_OUT_FILE = join(DRPM_CONFIG_DIR, 'registry.out');
const DRPM_VERSION_FILE = join(DRPM_CONFIG_DIR, '.version');
const DRPM_PROFILE = join(DRPM_CONFIG_DIR, 'profile.json');

export class Setup {
  static missing: string[] = [];

  // Helper function to check if setup is needed
  static isDone(): boolean {
    if(!existsSync(DRPM_CONFIG_DIR)) {
      this.missing.push(DRPM_CONFIG_DIR);
    }
    if(!existsSync(DRPM_BAK_DIR)) {
      this.missing.push(DRPM_BAK_DIR);
    }
    if(!existsSync(DRPM_REGISTRYPID_FILE)) {
      this.missing.push(DRPM_REGISTRYPID_FILE);
    }
    if(!existsSync(DRPM_REGISTRY_OUT_FILE)) {
      this.missing.push(DRPM_REGISTRY_OUT_FILE);
    }
    if(!existsSync(DRPM_VERSION_FILE)) {
      this.missing.push(DRPM_VERSION_FILE);
    }
    if(!existsSync(DRPM_PROFILE)) {
      this.missing.push(DRPM_PROFILE);
    }
    return this.missing.length === 0;
  }

  public static async run(): Promise<void> {
    if (!await exists(DRPM_CONFIG_DIR)) {
      await ensureDir(DRPM_CONFIG_DIR);
      Logger.log(`DRPM .config dir created (${DRPM_CONFIG_DIR})`);
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