import { exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { DEFAULT_PASSWORD, DRPM_HOME, DRPM_PROFILE } from '../../config.js';
import { Logger } from '../../utils/logger.js';
import { stringifier } from '../../utils/misc.js';
import { ProfileJson, ProfileData } from '../../utils/types.js';

export class ProfileUtils {
  // Helper function to check if setup is needed
  static async needSetup(): Promise<boolean> {
    return !(await exists(DRPM_HOME) || await exists(DRPM_PROFILE));
  }

  // Helper function to validate profile data
  static valid(data?: ProfileJson): boolean | ProfileJson {
    if(!data) {
      Logger.error('ProfileError: No profile data found.');
      return false;
    }
    const { did, password, dwnEndpoints, web5DataPath } = data?.[data?.current] ?? {};
    // Check for empty or invalid DID
    if (!did || did.trim() === '') {
      Logger.error('ProfileError: DID cannot be blank.');
      return false;
    }
    // Check for empty or default password
    if (!password || password === DEFAULT_PASSWORD) {
      Logger.error('ProfileError: Password cannot be blank or set to the default password.');
      return false;
    }
    // Check that dwnEndpoint has at least one valid entry
    if (!Array.isArray(dwnEndpoints) || dwnEndpoints.length === 0) {
      Logger.error('ProfileError: DWN endpoint cannot be empty.');
      return false;
    }
    // Check if dataPath is empty or invalid
    if (!web5DataPath || web5DataPath.trim() === '') {
      Logger.error('ProfileError: Web5 Data Path cannot be empty.');
      return false;
    }
    // If no errors, return the profile
    return true;
  }

  // Helper function to check if a profile exists
  static async exists(profile?: ProfileJson, method?: string): Promise<boolean | ProfileJson> {
    try {
      profile ??= await this.load();
      if(!profile) return false;

      const data = profile[profile.current ?? method];
      if(!data) return false;

      return profile;
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to load profile', error);
      return false;
    }
  }

  // Helper function to load existing profile or create a new one
  static async load(): Promise<ProfileJson> {
    const profile = await readFile(DRPM_PROFILE, 'utf8');
    return JSON.parse(profile);
  }

  static async current(profile?: ProfileJson): Promise<string> {
    profile ??= await this.load();
    return profile.current ?? 'dht';
  }

  static async data(profile?: ProfileJson): Promise<{current: string; data: ProfileData}> {
    profile ??= await this.load();
    const current = profile.current ?? 'dht';
    return {current, data: profile[current]};
  }

  // Helper function to save profile data to the file
  static async save(profile: ProfileJson): Promise<void> {
    await writeFile(DRPM_PROFILE, stringifier(profile));
  }

  // Helper function to save profile data to the file
  static async wipe(): Promise<void> {
    await writeFile(DRPM_PROFILE, stringifier({
      current : '',
      dht     : {
        did            : null,
        dwnEndpoints   : null,
        web5DataPath   : null,
        password       : null,
        recoveryPhrase : null
      },
      web : {
        did            : null,
        dwnEndpoints   : null,
        web5DataPath   : null,
        password       : null,
        recoveryPhrase : null
      },
      btc : {
        did            : null,
        dwnEndpoints   : null,
        web5DataPath   : null,
        password       : null,
        recoveryPhrase : null
      }
    }));
  }
}