import { DidJwk } from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
import { exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { DEFAULT_PASSWORD, DEFAULT_RECOVERY_PHRASE, DEFAULT_WEB5DATAPATH, DRPM_HOME, DRPM_PROFILE } from '../config.js';
import { DidWebAgent } from '../utils/did/did-web-facade.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile, createPassword, stringify } from '../utils/misc.js';
import { DidDhtCreateParams, DidWebCreateParams, Profile, ProfileCreateParams, ProfileData, ProfileOptions, ProfileSwitchOptions } from '../utils/types.js';
import { DrpmWeb5 } from './web5.js';

export class DhtProfile {
  static async createAgent({ data }: { data: ProfileData }): Promise<{agent: Web5UserAgent; data: ProfileData}> {
    const agent = await Web5UserAgent.create({ dataPath: data.web5DataPath });

    if(await agent.firstLaunch()) {
      data.recoveryPhrase = await agent.initialize({ password: data.password });
    } else {
      throw new Error('Profile already exists. Use "drpm profile switch --dht" to load this profile.');
    }

    await agent.start({ password: data.password });

    const identity = await agent.identity.create({
      didMethod  : 'dht',
      metadata   : { name: 'DRPM' },
      didOptions : {
        services : [
          {
            id              : 'dwn',
            type            : 'DecentralizedWebNode',
            serviceEndpoint : data.dwnEndpoints,
            enc             : '#enc',
            sig             : '#sig',
          }
        ],
        verificationMethods : [
          {
            algorithm : 'Ed25519',
            id        : 'sig',
            purposes  : ['assertionMethod', 'authentication']
          },
          {
            algorithm : 'secp256k1',
            id        : 'enc',
            purposes  : ['keyAgreement']
          }
        ]
      }
    });

    data.did = identity.metadata.connectedDid ?? identity.did.uri;

    return { agent, data };
  }

  // Helper function to create a new DHT profile
  static async create({ dwnEndpoints, password, recoveryPhrase, web5DataPath }: DidDhtCreateParams): Promise<Partial<Profile>> {
    password ??= createPassword();
    recoveryPhrase ??= DEFAULT_RECOVERY_PHRASE;
    web5DataPath ??= `${DEFAULT_WEB5DATAPATH}/DHT/AGENT`;

    const { agent, data } = await this.createAgent({
      data : {
        password,
        web5DataPath,
        recoveryPhrase,
        did            : '',
        dwnEndpoints   : [dwnEndpoints],
      }
    });
    console.log('data', data);

    await DrpmWeb5.connectDht({ data, agent });

    return { current: 'dht', dht: data };
  }
}

export class WebProfile {
  // Helper function to create a new Web profile
  static async create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did }: DidWebCreateParams): Promise<Partial<Profile>> {

    const data = {
      did            : did ?? '',
      dwnEndpoints   : [dwnEndpoints],
      password       : password ?? createPassword(),
      portableDid    : await DidJwk.create(),
      recoveryPhrase : recoveryPhrase ?? DEFAULT_RECOVERY_PHRASE,
      web5DataPath   : web5DataPath ?? `${DEFAULT_WEB5DATAPATH}/WEB/${did}/AGENT`,
    };

    const agent = await DidWebAgent.create({
      dataPath    : data.web5DataPath,
      portableDid : data.portableDid
    });

    if(await agent.firstLaunch()) {
      data.recoveryPhrase = await agent.initialize({ password: data.password });
    } else {
      throw new Error('Profile already exists. Use "drpm profile switch --web" to load this profile.');
    }
    await agent.start({ password: data.password });

    await DrpmWeb5.connectWeb({ data, agent });
    return { current: 'web', web: data };
  }
}

export class DrpmProfileUtils {
  // Helper function to check if setup is needed
  static async needSetup(): Promise<boolean> {
    return !(await exists(DRPM_HOME) || await exists(DRPM_PROFILE));
  }

  // Helper function to validate profile data
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

  // Helper function to check if a profile exists
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

  // Helper function to load existing profile or create a new one
  static async load(): Promise<Profile> {
    const profile = await readFile(DRPM_PROFILE, 'utf8');
    return JSON.parse(profile);
  }

  // Helper function to save profile data to the file
  static async save(profile: Profile): Promise<void> {
    await writeFile(DRPM_PROFILE, stringify(profile));
  }
}

export class DrpmProfile extends DrpmProfileUtils {
  // Subcommand function to create a new profile
  static async create(params: ProfileCreateParams): Promise<void> {
    const { dwnEndpoints, password, recoveryPhrase, web5DataPath, method = 'dht', did } = params;

    if(await this.needSetup()) {
      throw new Error(`DRPM config not setup. Re-install drpm to setup ${DRPM_HOME}.`);
    }

    if(!dwnEndpoints) {
      throw new Error('DWN endpoints required to create a new profile.');
    }

    const profile = await this.load();
    let partialProfile;
    if(did && recoveryPhrase) {
      const [_, method, id] = did.split(':');
      const data = {
        did            : did,
        recoveryPhrase : recoveryPhrase,
        dwnEndpoints   : dwnEndpoints.split(','),
        password       : password ?? createPassword(),
        web5DataPath   : web5DataPath ?? `${DEFAULT_WEB5DATAPATH}/${method}/${id}/AGENT`,
      };
      if(method === 'dht') {
        await DrpmWeb5.connectDht({ data });
        partialProfile = { current: 'dht', dht: data };
      } else {
        // await DrpmWeb5.connectWeb({ data });
        partialProfile = { current: 'web', dht: data };
      }
    } else {
      partialProfile = method == 'web'
        ? await WebProfile.create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did })
        : await DhtProfile.create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did });
    }

    if(!partialProfile) {
      throw new Error('Profile creation failed.');
    }

    await this.save({ ...profile, ...partialProfile });

    Logger.log(`Created ${method} profile: ${stringify(partialProfile)}`);
  }

  // Subcommand function to get profile data
  static async get(options: ProfileOptions): Promise<void> {
    const profile = await this.load();
    const current = profile.current ?? 'dht';
    const data = profile[current];
    const optionKeys = Object.keys(options);
    !optionKeys.length
      ? Logger.plain(`${current.toUpperCase()} Profile:\n${cleanProfile(data)}`)
      : optionKeys.forEach((key) => {
        if (data[key as keyof ProfileOptions]) {
          Logger.plain(`${key}: ${data[key as keyof ProfileData]}`);
        } else {
          Logger.error(`ProfileError: ${key} not found in profile.`);
        }
      });
  }

  // Subcommand function to update profile data
  static async set({ did, password, dwnEndpoints, web5DataPath, recoveryPhrase }: ProfileOptions): Promise<void> {
    const profile = await this.load();
    const current = profile.current ?? 'dht';
    const data = profile[current];
    const updatedData = {
      did            : did ?? data.did,
      password       : password ?? data.password,
      dwnEndpoints   : !dwnEndpoints
        ? data.dwnEndpoints
        : dwnEndpoints.split(','),
      web5DataPath   : web5DataPath ?? data.web5DataPath,
      recoveryPhrase : recoveryPhrase ?? data.recoveryPhrase,
    };
    await this.save({ ...profile, [current]: { ...data, ...updatedData, } });
    Logger.log(`Updated ${profile.current} profile: ${cleanProfile(updatedData)}`);
  }

  // Subcommand function to switch between profiles
  static async switch({ dht, web, btc }: ProfileSwitchOptions): Promise<void> {
    const profile = await this.load();
    Logger.log('dht, web, btc', dht, web, btc);
    profile.current = dht ? 'dht' : web ? 'web' : btc ? 'btc' : profile.current;
    await this.save(profile);
    const data = profile[profile.current];
    Logger.log(`Switched to ${profile.current} profile: ${cleanProfile(data)}`);
  }

  // Subcommand function to switch between profiles
  static async list(): Promise<void> {
    const profile = await this.load();
    const [dht, web, btc] = Object.keys(profile).filter((key) => key !== 'current').map((key) => key.trim());

    Logger.plain('Available profiles:');;
    Logger.plain(` - ${dht}`);
    Logger.plain(` - ${web}`);
    Logger.plain(` - ${btc}`);
  }
}

DrpmProfile.list();