import { readFile } from 'fs/promises';
import { join } from 'path';

const CWD = process.cwd();
const HOME = process.env.HOME;
const DPM_PORT = process.env.PORT || 2092;

const REGISTRY_DIR_NAME = '.registry';
const REGISTRY_DIR = join(CWD, REGISTRY_DIR_NAME);

const REGISTRY_PROCESS_NAME = 'registry.dpm.software';
const REGISTRY_PID_FILE = 'registry.pid';
const REGISTRY_PID = await readFile(join(CWD, REGISTRY_PID_FILE), 'utf8') ?? process.pid ?? 0;

export default {
  CWD,
  HOME,
  DPM_PORT,
  REGISTRY_PROCESS_NAME,
  REGISTRY_PID_FILE,
  REGISTRY_PID,
  REGISTRY_DIR,
  REGISTRY_DIR_NAME,
  DPM_HOME          : `${HOME}/.dpm`,
  NPMRC             : `${HOME}/.npmrc`,
  LOCAL_NPMRC       : `${CWD}/.npmrc`,
  DPM_REGISTRY      : process.env.DPM_REGISTRY || `http://localhost:${DPM_PORT}`,
  PREFIXES          : [
    '@dpm:registry=$REGISTRY',
    '@dpk:registry=$REGISTRY',
    'dpm:registry=$REGISTRY',
    'dpk:registry=$REGISTRY'
  ],
};