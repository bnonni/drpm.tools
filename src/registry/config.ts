import { readFile } from 'fs/promises';
import { join } from 'path';

export const CWD = process.cwd();
export const HOME = process.env.HOME;
export const DPM_PORT = process.env.PORT || 2092;

export const REGISTRY_DIR_NAME = '.registry';
export const REGISTRY_DIR = join(CWD, REGISTRY_DIR_NAME);

export const REGISTRY_PROCESS_NAME = 'registry.dpm.software';
export const REGISTRY_PID_FILE = 'registry.pid';
export const REGISTRY_PID = await readFile(join(CWD, REGISTRY_PID_FILE), 'utf8') ?? process.pid ?? 0;

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