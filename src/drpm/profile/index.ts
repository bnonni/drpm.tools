import * as Inquirer from '@inquirer/prompts';
import { DEFAULT_WEB5DATAPATH, DRPM_HOME } from '../../config.js';
import { Logger } from '../../utils/logger.js';
import { cleanProfile, createPassword, stringifier } from '../../utils/misc.js';
import { DrpmProfileCreateParams, DrpmProfileData, DrpmProfileDeleteOptions, DrpmProfileMethodOptions, DrpmProfileOptions } from '../../utils/types.js';
import { DWeb5 } from '../dweb5.js';
import { DhtProfile } from './dht-profile.js';
import { ProfileUtils } from './profile-utils.js';
import { WebProfile } from './web-profile.js';

export class Profile extends ProfileUtils {
  constructor() { super(); }

  // Subcommand function to create a new profile
  static async create(params: DrpmProfileCreateParams): Promise<void> {
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
        await DWeb5.connectDht({ data });
        partialProfile = { current: 'dht', dht: data };
      } else {
        // await DWeb5.connectWeb({ data });
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

    Logger.log(`Created ${method} profile: ${stringifier(partialProfile)}`);
  }

  // Subcommand function to read profile data
  static async read(options: DrpmProfileOptions): Promise<void> {
    const profile = await this.load();
    const current = profile.current ?? 'dht';
    const data = profile[current];
    const optionKeys = Object.keys(options);
    !optionKeys.length
      ? Logger.plain(`${current.toUpperCase()} Profile:\n${cleanProfile(data)}`)
      : optionKeys.forEach((key) => {
        if (data[key as keyof DrpmProfileOptions]) {
          Logger.plain(`${key}: ${data[key as keyof DrpmProfileData]}`);
        } else {
          Logger.error(`ProfileError: ${key} not found in profile.`);
        }
      });
  }

  // Subcommand function to update profile data
  static async update({ did, password, dwnEndpoints, web5DataPath, recoveryPhrase }: DrpmProfileOptions): Promise<void> {
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

  static async delete({ method, current, all }: DrpmProfileDeleteOptions): Promise<void> {
    const profile = await this.load();
    if (all) {
      const answer = await Inquirer.select({
        choices : ['Yes', 'No'],
        message : 'Are you sure you want to delete all profiles?'
      });

      if(answer === 'No') {
        return Logger.log('Wise choice! Exiting ...');
      }

      Logger.log('I hope you know what you are doing ... Deleted all profiles');
      await this.wipe();

      return Logger.log('Deleted all profiles!');
    }
    profile.current = '';
    profile[method ? method : profile.current] = {};
    await this.save(profile);
    Logger.log(`Deleted ${current} profile`);
  }

  // Subcommand function to switch between profiles
  static async switch({ dht, web, btc }: DrpmProfileMethodOptions): Promise<void> {
    const profile = await this.load();
    if(!(dht && web && btc)) {
      profile.current = await Inquirer.select({
        message : 'Select a profile to switch to',
        choices : ['dht', 'web', 'btc']
      });
    } else {
      profile.current = dht ? 'dht' : web ? 'web' : btc ? 'btc' : profile.current;
    }
    await this.save(profile);
    Logger.log(`Switched to ${profile.current} profile: ${cleanProfile(profile[profile.current])}`);
  }

  // Subcommand function to switch between profiles
  static async list(): Promise<void> {
    const profile = await this.load();
    const [dht, web, btc] = Object.keys(profile)
      .filter((key) => key !== 'current')
      .map((key) => `${key.trim()} (${key === profile.current ? 'current' : 'inactive'})`);
    Logger.plain('Available profiles:');;
    Logger.plain(` - ${dht}`);
    Logger.plain(` - ${web}`);
    Logger.plain(` - ${btc}`);
    const answer: string = await Inquirer.select({
      message : 'Which profile would you like to display?',
      choices : ['dht', 'web', 'btc']
    }) ?? profile.current;
    Logger.plain(`${answer.toUpperCase()} Profile:\n${cleanProfile(profile[answer])}`);
  }

  static async recover(): Promise<void> {
    throw new Error('ProfileCommand: recover not implemented');
  }
}