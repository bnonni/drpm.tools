import { Profile } from '../../drpm/profile/index.js';
import { ProfileError } from '../../utils/errors.js';
import {
  DrpmProfileCreateParams,
  DrpmProfileDeleteOptions,
  DrpmProfileMethodOptions,
  DrpmProfileOptions
} from '../../utils/types.js';

export class ProfileCommand {
  static async create(params: DrpmProfileCreateParams): Promise<void> {
    try {
      await Profile.create(params);
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to create profile: ${error.message}`, 'ProfileCreate');
    }
  }

  static async read(options: DrpmProfileOptions): Promise<void> {
    try {
      await Profile.read(options);
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to read profile: ${error.message}`, 'ProfileRead');
    }
  }

  static async update(options: DrpmProfileOptions): Promise<void> {
    try {
      await Profile.update(options);
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to update profile: ${error.message}`, 'ProfileUpdate');
    }
  }

  static async delete(options: DrpmProfileDeleteOptions): Promise<void> {
    try {
      await Profile.delete(options);
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to delete profile: ${error.message}`, 'ProfileDelete');
    }
  }

  static async switch(options: DrpmProfileMethodOptions): Promise<void> {
    try {
      await Profile.switch(options);
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to switch profile: ${error.message}`, 'ProfileSwitch');
    }
  }

  static async list(): Promise<void> {
    try {
      await Profile.list();
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to list profiles: ${error.message}`, 'ProfileList');
    }
  }

  static async recover(): Promise<void> {
    try {
      await Profile.recover();
      process.exit(0);
    } catch (error: any) {
      throw new ProfileError(`Failed to recover profile: ${error.message}`, 'ProfileRecover');
    }
  }
}