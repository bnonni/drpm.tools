import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../../utils/logger.js';
import { secureContext, stringifier } from '../../utils/misc.js';
import { DhtProfileCreate, ProfileData, ProfileOptions, WebProfileCreate } from '../../utils/types.js';
import { DhtProfile } from '../profile/dht-profile.js';
import { Profile } from '../profile/index.js';
import { WebProfile } from '../profile/web-profile.js';

export class Context {
  static async delete(options: { method?: string; all?: boolean }): Promise<void> {
    const { method } = options ?? {};
    if (options.all) {
      const answer = await Inquirer.select({
        choices : ['Yes', 'No'],
        message : 'Are you sure you want to delete all profiles?'
      });

      if(answer === 'No') {
        return Logger.log('Wise choice! Exiting ...');
      }

      Logger.log('I hope you know what you are doing ... deleting profile.json');
      await Profile.wipe();

      return Logger.log('Deleted all profiles!');
    }
    const profile = await Profile.load();
    if (method) {
      profile[method] = {};
    }else {
      profile[profile.current] = {};
    }
    await Profile.save({...profile, current: ''});
    Logger.log(`Deleted profile context ${profile.current}`);
  }

  // Subcommand function to update profile data
  static async update(options: ProfileOptions): Promise<void> {
    const { did, password, dwnEndpoints, web5DataPath, recoveryPhrase } = options;
    const profile = await Profile.load();
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
    await Profile.save({ ...profile, [current]: { ...data, ...updatedData, } });
    Logger.log(`Updated ${profile.current} profile: ${secureContext(updatedData)}`);
  }

  static async recover(options: any): Promise<void> {
    throw new Error('Context: recover not implemented: ' + options);
  }

  static async backup(options: any): Promise<void> {
    throw new Error('Context: backup not implemented: ' + options);
  }

  // Subcommand function to create a new profile
  static async create(params: DhtProfileCreate | WebProfileCreate): Promise<void> {
    try {
      const { dwnEndpoints, password, recoveryPhrase, web5DataPath, method = 'dht', did } = params;
      if(!dwnEndpoints) {
        Logger.error('DWN endpoints required to create a new profile.');
        process.exit(1);
      }

      if(method == 'web' && !did) {
        Logger.error('DID required to create a new web profile.');
        process.exit(1);
      }

      const profile = await Profile.load();
      const { success, error, [method]: partialProfile } = method == 'web'
        ? await WebProfile.create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did: did! })
        : await DhtProfile.create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did });

      if(!success) {
        Logger.error(`Failed to create ${method} profile`, error);
        process.exit(1);
      }

      await Profile.save({ ...profile, [method]: partialProfile });

      Logger.log(`Created ${method} profile: ${stringifier(partialProfile)}`);
    } catch (error: any) {
      Logger.error(`Failed to create profile: ${error.message}`);
      process.exit(1);
    }
  }

  // Subcommand function to read profile data
  static async read(options: ProfileOptions): Promise<void> {
    const optionKeys = Object.keys(options);
    const {current, data} = await Profile.data();
    !optionKeys.length
      ? Logger.plain(`${current.toUpperCase()} Profile:\n${secureContext(data)}`)
      : optionKeys.forEach((key) => {
        if (data[key as keyof ProfileData]) {
          Logger.plain(`${key}: ${data[key as keyof ProfileData]}`);
        } else {
          Logger.error(`ProfileError: ${key} not found in profile.`);
        }
      });
  }
}