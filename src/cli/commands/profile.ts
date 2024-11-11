import { Profile } from '../../drpm/profile.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class ProfileCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      const profile = new Profile(options?.name);
      switch (subcommand) {
        case 'read':
          await profile.read(options);
          break;
        case 'add':
          await profile.add(options);
          break;
        case 'delete':
          await profile.delete(options);
          break;
        case 'list':
          await profile.list();
          break;
        case 'switch':
          await profile.switch(options);
          break;
        case 'recover':
          await Profile.recover(options);
          break;
        case 'backup':
          await profile.backup(options);
          break;
        default:
          throw new DRegistryPackageManagerError(`ProfileCommand: Unknown subcommand ${subcommand}`);
      }
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }
}