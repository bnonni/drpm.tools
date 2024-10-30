import { DidJwk } from '@web5/dids';
import { ensureDir, ensureFile, exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { DidWebAgent } from '../../utils/did/did-web-facade.js';
import { Logger } from '../../utils/logger.js';
import { cleanProfile, createPassword, stringify } from '../../utils/misc.js';
import {
  Profile,
  ProfileCreateParams,
  ProfileData,
  ProfileOptions
} from '../../utils/types.js';
import {
  DEFAULT_PASSWORD,
  DEFAULT_PROFILE,
  DEFAULT_WEB5DATAPATH,
  DRPM_HOME,
  DRPM_PROFILE
} from '../drpm.js';
import { ConnectCommand } from './connect.js';

export class ProfileCommand {
  static async needSetup(): Promise<boolean> {
    return !(await exists(DRPM_HOME) || await exists(DRPM_PROFILE));
  }

  static async setup(): Promise<void> {
    await ensureDir(DRPM_HOME);
    await ensureFile(DRPM_PROFILE);
    await writeFile(DRPM_PROFILE, stringify(DEFAULT_PROFILE));
  }

  static async createDht(password: string, dwnEndpoint: string): Promise<Partial<Profile>> {
    const data = {
      password,
      did            : '',
      recoveryPhrase : '',
      dwnEndpoints   : [dwnEndpoint],
      web5DataPath   : `${DEFAULT_WEB5DATAPATH}/DHT/AGENT`,
    };
    const { did, recoveryPhrase } = await ConnectCommand.didDht({ data });
    return {current: 'dht', dht: {...data, did, recoveryPhrase: recoveryPhrase!}};
  }

  static async createWeb(url: string, dwnEndpoint: string): Promise<Partial<Profile>> {
    const defaultRecovery = 'default-recovery-phrase';
    const data = {
      recoveryPhrase : defaultRecovery,
      dwnEndpoints   : [dwnEndpoint],
      did            : `did:web:${url}`,
      password       : createPassword(),
      portableDid    : await DidJwk.create(),
      web5DataPath   : `${DEFAULT_WEB5DATAPATH}/WEB/AGENT`,
    };
    const agent = await DidWebAgent.create({ dataPath: data.web5DataPath, portableDid: data.portableDid });
    const { recoveryPhrase = defaultRecovery } = await ConnectCommand.didWeb({ agent, data });
    return { current: 'web', web: { ...data, recoveryPhrase } };
  }

  // Function to validate profile data
  static valid(data?: Profile): boolean | Profile {
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

  // Function to check if a profile exists
  static async exists(method?: string): Promise<boolean | Profile> {
    try {
      const profile = await this.load();
      if(!profile) return false;

      const data = profile[profile.current ?? method];
      if(!data) return false;

      return profile;
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to load profile', error);
      return false;
    }
  }

  // Function to create a new profile
  static async create({ password, dwnEndpoint, method }: ProfileCreateParams): Promise<void> {
    try {
      if(await this.needSetup()) await this.setup();
      method ??= 'dht';
      if(!dwnEndpoint) {
        throw new Error('DWN endpoint is required to create a new profile.');
      }
      const profile = await this.load();
      // if(this.valid(profile)) {
      //   throw new Error(`Profile already setup and valid for ${method} context.`);
      // }
      password ??= createPassword();
      const partialProfile = await this.createDht(password, dwnEndpoint);
      await this.save({...profile, ...partialProfile});
      Logger.log(`New DRPM ${method} profile created: ${stringify(partialProfile)}`);
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to create profile', error);
      throw error;
    }
  }

  // Function to load existing profile or create a new one
  static async load(): Promise<Profile> {
    const profile = await readFile(DRPM_PROFILE, 'utf8');
    return JSON.parse(profile);
  }

  // Function to save profile data to the file
  static async save(profile: Profile): Promise<void> {
    await writeFile(DRPM_PROFILE, stringify(profile));
  }

  // Function to get profile data
  static async get(options: ProfileOptions): Promise<void> {
    const profile = await this.load();
    const data = profile[profile.current ?? 'dht'];
    const profileKeys = Object.keys(data);
    !profileKeys.length
      ? Logger.info(`Profile: ${stringify(profile)}`)
      : profileKeys.forEach((key) => {
        if (options[key as keyof ProfileOptions]) {
          Logger.info(`${data[key as keyof ProfileData]}`);
        }
      });
  }

  // Function to update profile data
  static async set({ did, password, dwnEndpoint, web5DataPath, recoveryPhrase }: ProfileOptions): Promise<void> {
    const profile = await this.load();
    const current = profile.current ?? 'dht';
    const data = profile[current];
    const updatedData = {
      did            : did ?? data.did,
      password       : password ?? data.password,
      dwnEndpoints   : !dwnEndpoint
        ? data.dwnEndpoints
        : !dwnEndpoint.startsWith('http')
          ? [`https://${dwnEndpoint}`]
          : [dwnEndpoint],
      web5DataPath   : web5DataPath ?? data.web5DataPath,
      recoveryPhrase : recoveryPhrase ?? data.recoveryPhrase,
    };
    await this.save({ ...profile, [current]: { ...data, ...updatedData, } });
    Logger.log(`Profile updated: ${cleanProfile(updatedData)}`);
  }

  static async switch({ method }: { method: string }): Promise<void> {
    const profile = await this.load();
    if(!profile[method]) {
      throw new Error(`Profile for ${method} does not exist.`);
    }
    await this.save({...profile, current: method});
    Logger.log(`Switched to ${method} profile.`);
  }
}