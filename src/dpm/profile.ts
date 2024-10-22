import { join } from 'path';
import { DRPM_HOME } from '../config.js';
import { readFile, writeFile } from 'fs/promises';
import { userInfo } from 'os';
import { ensureDir, ensureFile, exists } from 'fs-extra';
import { Logger } from '../utils/logger.js';

export const DRPM_USER = userInfo()?.username;
export const DEFAULT_DATAPATH = join(DRPM_HOME, 'DATA');
export const DRPM_PROFILE = join(DRPM_HOME, '.profile');
export const DEFAULT_PROFILE = { did: '', dwnEndpoint: [], dataPath: '', password: 'insecure-static-password' };

type Profile = {
  did: string;
  password: string;
  dwnEndpoint: string[];
  dataPath: string;
}
type ProfileOptions = {
    did?: string;
    password?: string;
    dwnEndpoint?: string;
    dataPath?: string
}
type SetProfileParams = ProfileOptions & { profile: Profile; }
type ProfileCommandParams = ProfileOptions & { action: string; }

export class DpmProfile {
// Function to load existing profile or create a new one
  static async loadProfile(): Promise<Profile> {
    const profile = await readFile(DRPM_PROFILE, 'utf8');
    return JSON.parse(profile);
  }

  // Function to save profile data to the file
  static async saveProfile(profile: any) {
    await writeFile(DRPM_PROFILE, JSON.stringify(profile, null, 2));
  }

  static setProfile({ profile, did, password, dwnEndpoint, dataPath }: SetProfileParams): Profile {
    const changes = [];
    if (did) {
      profile.did = did;
      changes.push('did');
    }
    if (password) {
      profile.password = password;
      changes.push('password');
    }
    if (dwnEndpoint) {
      profile.dwnEndpoint = !dwnEndpoint.startsWith('http') ? [`https://${dwnEndpoint}`] : [dwnEndpoint];
      changes.push('dwnEndpoint');
    }
    if (dataPath) {
      profile.dataPath = dataPath;
      changes.push('dataPath');
    }
    return profile;
  }

  static async run({ action, did, password, dwnEndpoint, dataPath }: ProfileCommandParams): Promise<void> {
    if(!await exists(DRPM_HOME)) {
      await ensureDir(DRPM_HOME);
    }

    if(!await exists(DRPM_PROFILE)) {
      await ensureFile(DRPM_PROFILE);
      await writeFile(DRPM_PROFILE, JSON.stringify(DEFAULT_PROFILE, null, 2));
    }

    const profile = await this.loadProfile();
    if(!profile.dataPath) {
      profile.dataPath = DEFAULT_DATAPATH;
    }

    switch(action) {
      case 'set': {
        const updated = this.setProfile({ profile, did, password, dwnEndpoint, dataPath });
        await this.saveProfile({...updated, ...profile});
        Logger.log(`Profile updated: ${JSON.stringify(updated, null, 2)}`);
        break;
      }
      case 'get':
        Logger.log(`Current profile: ${JSON.stringify(profile, null, 2)}`);
        break;
      default:
        throw new Error(`Invalid action ${action}: must be either 'get' or 'set'`);
    }
    Logger.log('Profile updated successfully.');
  }
}