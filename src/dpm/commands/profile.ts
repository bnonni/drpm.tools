import { Web5 } from '@web5/api';
import { ensureDir, ensureFile, exists } from 'fs-extra';
import { cp, readFile, writeFile } from 'fs/promises';
import {
  DEFAULT_DATAPATH,
  DEFAULT_PASSWORD,
  DEFAULT_PROFILE,
  DRPM_HOME,
  DRPM_HOME_BAK_DIR,
  DRPM_PROFILE_GLOBAL
} from '../../config.js';
import { Logger } from '../../utils/logger.js';
import { cleanProfile, createPassword, stringify } from '../../utils/misc.js';
import { ProfileCreateParams, ProfileData, ProfileOptions } from '../../utils/types.js';

export class ProfileCommand {
  static async setup() {
    if(!await exists(DRPM_HOME)) {
      await ensureDir(DRPM_HOME);
    }
    if(!await exists(DRPM_PROFILE_GLOBAL)) {
      await ensureFile(DRPM_PROFILE_GLOBAL);
      await writeFile(DRPM_PROFILE_GLOBAL, stringify(DEFAULT_PROFILE));
    }
  }

  static async validate(profile?: ProfileData) {
    profile ??= await this.load();
    const { did, password, dwnEndpoints, web5DataPath } = profile ?? {};
    const errors: string[] = [];
    // Check for empty or invalid DID
    if (!did || did.trim() === '') {
      errors.push('ProfileError: DID cannot be blank.');
    }
    // Check for empty or default password
    if (!password || password === DEFAULT_PASSWORD) {
      errors.push('ProfileError: Password cannot be blank or set to the default password.');
    }
    // Check that dwnEndpoint has at least one valid entry
    if (!Array.isArray(dwnEndpoints) || dwnEndpoints.length === 0) {
      errors.push('ProfileError: DWN endpoint cannot be empty.');
    }
    // Check if dataPath is set, otherwise set to DEFAULT_DATAPATH
    if (!web5DataPath || web5DataPath.trim() === '') {
      profile.web5DataPath = DEFAULT_DATAPATH;
    }
    // If there are errors, throw or handle them
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
    // If no errors, return the profile
    return profile;
  }

  static async exists(profile?: ProfileData) {
    profile ??= await this.load();
    const { did, password, dwnEndpoints, web5DataPath } = profile ?? {};
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
    // Check that dwnEndpoints have at least one valid entry
    if (!Array.isArray(dwnEndpoints) || dwnEndpoints.length === 0) {
      Logger.error('ProfileError: DWN endpoint cannot be empty.');
      return false;
    }
    // Check if dataPath is set, otherwise set to DEFAULT_DATAPATH
    if (!web5DataPath || web5DataPath.trim() === '') {
      Logger.warn(`ProfileWarn: Web5 Data Path not found, setting to ${DEFAULT_DATAPATH}`);
      profile.web5DataPath = DEFAULT_DATAPATH;
    }
    // If all are set, return the true
    return true;
  }

  static async create({password, dwnEndpoint}: ProfileCreateParams): Promise<void> {
    // Check and setup env stuffs
    await this.setup();
    // Check for dwnEndpoint, fail if not present
    if(!dwnEndpoint) {
      throw new Error('DWN endpoint is required to create a new profile.');
    }
    const profile = await this.load();
    if(await this.exists(profile)) {
      return Logger.log(`Profile already setup: ${cleanProfile(profile)}`);
    }

    Logger.log(`Creating new profile ...`);
    await ensureDir(DRPM_HOME_BAK_DIR);
    await cp(DRPM_PROFILE_GLOBAL, `${DRPM_HOME_BAK_DIR}/${DRPM_PROFILE_GLOBAL}.bak`);

    const dwnEndpoints = [dwnEndpoint];
    const dataPath = profile.web5DataPath ?? DEFAULT_DATAPATH;
    password ??= createPassword();
    const { did, recoveryPhrase } = await Web5.connect({
      password,
      sync             : 'off',
      didCreateOptions : { dwnEndpoints },
      techPreview      : { dwnEndpoints },
      // agent            : await Web5UserAgent.create({ dataPath }),
    });
    const method = did.split(':')?.[1] ?? 'dht';
    await this.save({
      did,
      password,
      dwnEndpoints,
      default        : method,
      web5DataPath   : dataPath,
      recoveryPhrase : recoveryPhrase!,
    });
  }

  // Function to load existing profile or create a new one
  static async load(): Promise<ProfileData> {
    const profile = await readFile(DRPM_PROFILE_GLOBAL, 'utf8');
    const parsedProfile = JSON.parse(profile);
    const context = parsedProfile.default;
    return parsedProfile[context];
  }

  // Function to save profile data to the file
  static async save(profile: ProfileData): Promise<void> {
    await writeFile(DRPM_PROFILE_GLOBAL, stringify(profile));
  }

  static async get(options: ProfileOptions): Promise<void> {
    await ProfileCommand.setup();
    const profile = await this.load();
    const profileKeys = Object.keys(options);
    !profileKeys.length
      ? Logger.log(`Profile: ${stringify(profile)}`)
      : profileKeys.forEach((key) => {
        if (options[key as keyof ProfileOptions]) {
          Logger.log(`${key}: ${profile[key as keyof ProfileData]}`);
        }
      });
  }

  static async set({ did, password, dwnEndpoints, web5DataPath }: ProfileOptions): Promise<void> {
    await ProfileCommand.setup();
    const profile = await this.load();
    const updated: ProfileData = profile;
    if (did) {
      updated.did = did;
    }
    if (password) {
      updated.password = password;
    }
    if (dwnEndpoints) {
      updated.dwnEndpoints = !dwnEndpoints.startsWith('http')
        ? [`https://${dwnEndpoints}`]
        : [dwnEndpoints];
    }
    if (web5DataPath) {
      updated.web5DataPath = web5DataPath;
    }
    await this.save({ ...profile, ...updated });
    Logger.log(`Profile updated: ${cleanProfile(updated)}`);
  }
}