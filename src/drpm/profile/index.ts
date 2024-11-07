import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../../utils/logger.js';
import { secureProfile } from '../../utils/misc.js';
import {
  ProfileData,
  ProfileOptions
} from '../../utils/types.js';
import { ProfileUtils } from './profile-utils.js';

export class Profile extends ProfileUtils {
  constructor() { super(); }

  // Subcommand function to read profile data
  static async read(options: ProfileOptions): Promise<void> {
    const profile = await this.load();
    const current = profile.current ?? 'dht';
    const data = profile[current];
    const optionKeys = Object.keys(options);

    !optionKeys.length
      ? Logger.plain(`${current.toUpperCase()} Profile:\n${secureProfile(data)}`)
      : optionKeys.forEach((key) => {
        if (data[key as keyof ProfileOptions]) {
          Logger.plain(`${key}: ${data[key as keyof ProfileData]}`);
        } else {
          Logger.error(`ProfileError: ${key} not found in profile.`);
        }
      });
  }

  // Subcommand function to switch between profiles
  static async switch({ dht, web, btc }: any): Promise<void> {
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
    Logger.log(`Switched to ${profile.current} profile: ${secureProfile(profile[profile.current])}`);
  }

  // Subcommand function to switch between profiles
  static async list(): Promise<void> {
    const profile = await this.load();
    const [dht, web, btc] = Object.keys(profile)
      .filter((key) => key !== 'current')
      .map((key) => `${key.trim()} (${key === profile.current ? 'active' : 'inactive'})`);
    Logger.plain(
      `Available profiles:
        1. ${dht}
        2. ${web}
        3. ${btc}`
    );
  }

  static async recover(options: any): Promise<void> {
    throw new Error('ProfileCommand: recover not implemented: ' + options);
  }

  static async add(options: any): Promise<void> {
    throw new Error('ProfileCommand: add not implemented: ' + options);
  }
}