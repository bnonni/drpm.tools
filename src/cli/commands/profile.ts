import { AgentDidApi, AgentDidResolverCache, DwnDidStore } from '@web5/agent';
import { Web5 } from '@web5/api';
import { CryptoApi, LocalKeyManager } from '@web5/crypto';
import {
  BearerDid,
  DidDht,
  DidDocument,
  DidJwk,
  DidJwkCreateOptions,
  DidVerificationMethod,
  DidWeb
} from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
import { ensureDir, ensureFile, exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import {
  DEFAULT_PASSWORD,
  DEFAULT_PROFILE,
  DEFAULT_WEB5DATAPATH,
  DRPM_HOME,
  DRPM_PROFILE
} from '../../config.js';
import { Logger } from '../../utils/logger.js';
import { cleanProfile, createPassword, stringify } from '../../utils/misc.js';
import { Profile, ProfileCreateParams, ProfileData, ProfileOptions } from '../../utils/types.js';

export class DidWebFacade extends DidWeb {
  public static async create<TKms extends CryptoApi | undefined = undefined>({
    keyManager = new LocalKeyManager(),
    options = {}
  }: {
  keyManager?: TKms;
  options?: DidJwkCreateOptions<TKms>;
} = {}): Promise<BearerDid> {
    throw new Error('Method not implemented.' + keyManager + options);
  }

  public static async getSigningMethod({ didDocument }: {
  didDocument: DidDocument;
  methodId?: string;
}): Promise<DidVerificationMethod> {
    throw new Error('Method not implemented.' + didDocument);
  }
}

export class ProfileCommand {
  static async setup() {
    if(!await exists(DRPM_HOME)) {
      await ensureDir(DRPM_HOME);
    }
    if(!await exists(DRPM_PROFILE)) {
      await ensureFile(DRPM_PROFILE);
      await writeFile(DRPM_PROFILE, stringify(DEFAULT_PROFILE));
    }
  }

  static valid(data?: Profile): boolean | Profile {
    if(!data) {
      Logger.error('ProfileError: No profile data found.');
      return false;
    }
    const { did, password, dwnEndpoints, web5DataPath } = data?.[data?.current] ?? {};
    Logger.info('Profile data:', data);
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

  static async web(url: string, dwnEndpoint: string): Promise<Partial<Profile>> {
    const data = {
      did            : `did:web:${url}`,
      dwnEndpoints   : [dwnEndpoint],
      portableDid    : await DidJwk.create(),
      password       : createPassword(),
      recoveryPhrase : '',
      web5DataPath   : `${DEFAULT_WEB5DATAPATH}/WEB/${url}/AGENT`,
    };
    const agent = await Web5UserAgent.create({
      dataPath : data.web5DataPath,
      agentDid : await BearerDid.import({ portableDid: data.portableDid }),
      didApi   : new AgentDidApi({
        store         : new DwnDidStore(),
        didMethods    : [DidDht, DidJwk, DidWebFacade],
        resolverCache : new AgentDidResolverCache({
          location : `${data.web5DataPath}/DID_RESOLVERCACHE`
        }),
      })
    });
    const { recoveryPhrase } = await Web5.connect({
      agent,
      password         : data.password,
      connectedDid     : data.did,
      sync             : 'off',
      didCreateOptions : { dwnEndpoints: data.dwnEndpoints },
      techPreview      : { dwnEndpoints: data.dwnEndpoints }
    });
    return {current: 'web', web: {...data, recoveryPhrase: recoveryPhrase!}};
  }

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

  static async dht(password: string, dwnEndpoint: string): Promise<Partial<Profile>> {
    const data = {
      password,
      did            : '',
      recoveryPhrase : '',
      dwnEndpoints   : [dwnEndpoint],
      web5DataPath   : `${DEFAULT_WEB5DATAPATH}/DHT/AGENT`,
    };
    const { did, recoveryPhrase } = await Web5.connect({
      password,
      sync             : 'off',
      didCreateOptions : { dwnEndpoints: [dwnEndpoint] },
      techPreview      : { dwnEndpoints: [dwnEndpoint] },
    });
    return {current: 'dht', dht: {...data, did, recoveryPhrase: recoveryPhrase!}};
  }

  static async create({ password, dwnEndpoint, method }: ProfileCreateParams): Promise<void> {
    try {
      method ??= 'dht';
      await this.setup();
      if(!dwnEndpoint) {
        throw new Error('DWN endpoint is required to create a new profile.');
      }
      const profile = await this.load();
      if(this.valid(profile)) {
        throw new Error(`Profile already setup and valid for ${method} context.`);
      }
      password ??= createPassword();
      const partialProfile = await this.dht('password', dwnEndpoint);
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
    Logger.debug('Profile loaded:', profile);
    return JSON.parse(profile);
  }

  // Function to save profile data to the file
  static async save(profile: Profile): Promise<void> {
    await writeFile(DRPM_PROFILE, stringify(profile));
  }

  static async get(options: ProfileOptions): Promise<void> {
    await this.setup();
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

  static async set({
    did, password, dwnEndpoint, web5DataPath, recoveryPhrase
  }: ProfileOptions): Promise<void> {
    await this.setup();
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
    await this.setup();
    const profile = await this.load();
    if(!profile[method]) {
      throw new Error(`Profile for ${method} does not exist.`);
    }
    await this.save({...profile, current: method});
    Logger.log(`Switched to ${method} profile.`);
  }
}