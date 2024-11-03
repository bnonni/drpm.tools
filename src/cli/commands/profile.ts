import { DrpmProfile } from '../../drpm/profile.js';
import { Logger } from '../../utils/logger.js';
import { ProfileCreateParams, ProfileOptions, ProfileSwitchOptions } from '../../utils/types.js';

export class ProfileCommand {
  static async create(params: ProfileCreateParams): Promise<void> {
    try {
      await DrpmProfile.create(params);
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to create profile', error);
      throw error;
    }
  }
  static async get(options: ProfileOptions): Promise<void> {
    try {
      await DrpmProfile.get(options);
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to get profile', error);
      throw error;
    }
  }
  static async set(options: ProfileOptions): Promise<void> {
    try {
      await DrpmProfile.set(options);
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to set profile', error);
      throw error;
    }
  }
  static async switch(options: ProfileSwitchOptions): Promise<void> {
    try {
      await DrpmProfile.switch(options);
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to switch profile', error);
      throw error;
    }
  }

  static async list(): Promise<void> {
    try {
      await DrpmProfile.list();
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to switch profile', error);
      throw error;
    }
  }
}