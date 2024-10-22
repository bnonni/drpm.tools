import { readFile, writeFile } from 'fs/promises';
import { DRPM_PROFILE } from '../../config.js';
import { Logger } from '../../utils/logger.js';

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

  static async set({ did, password, dwnEndpoint, dataPath }: ProfileCommandParams): Promise<void> {

  }

  static async run({ action, did, password, dwnEndpoint, dataPath }: ProfileCommandParams): Promise<void> {
   

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
  }
}