import { exists, ensureDir, ensureFile } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { homedir, platform } from 'os';
import { join } from 'path';

const DRPM_DIR = 'drpm';
const CONFIG_DRPM_DIR = platform() === 'win32'
  ? join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), DRPM_DIR)
  : join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), DRPM_DIR);
const DRPM_REGISTRYPID_FILE = join(CONFIG_DRPM_DIR, 'registry.pid');
const DRPM_REGISTRY_OUT_FILE = join(CONFIG_DRPM_DIR, 'registry.out');
const DRPM_VERSION_FILE = join(CONFIG_DRPM_DIR, '.version');
const DRPM_PROFILE = join(CONFIG_DRPM_DIR, 'profile.json');

if (!await exists(CONFIG_DRPM_DIR)) {
  await ensureDir(CONFIG_DRPM_DIR);
  console.log(`DRPM config created (${CONFIG_DRPM_DIR})`);
}

if (!await exists(DRPM_REGISTRYPID_FILE)) {
  await ensureFile(DRPM_REGISTRYPID_FILE);
  console.log(`DRPM registry.pid created: ${DRPM_REGISTRYPID_FILE}`);
}

if (!await exists(DRPM_REGISTRY_OUT_FILE)) {
  await ensureFile(DRPM_REGISTRY_OUT_FILE);
  console.log(`DRPM registry.out created: ${DRPM_REGISTRY_OUT_FILE}`);
}

if (!await exists(DRPM_VERSION_FILE)) {
  await ensureFile(DRPM_VERSION_FILE);
  console.log(`DRPM .version created: ${DRPM_VERSION_FILE}`);
}

if (!await exists(DRPM_PROFILE)) {
  await writeFile(DRPM_PROFILE, `{
        "current": null,
        "dht": {
            "did": "",
            "dwnEndpoints": [],
            "web5DataPath": "",
            "password": "",
            "recoveryPhrase": ""
        },
        "web": {
            "did": "",
            "dwnEndpoints": [],
            "web5DataPath": "",
            "password": "",
            "recoveryPhrase": ""
        },
        "btc": {
            "did": "",
            "dwnEndpoints": [],
            "web5DataPath": "",
            "password": "",
            "recoveryPhrase": ""
        }
    }`);
  console.log(`DRPM profile.json created: ${DRPM_PROFILE}`);
}
console.log(`DRPM Setup Complete!`);