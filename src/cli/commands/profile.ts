import { Profile } from '../../drpm/profile.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class ProfileCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      switch (subcommand) {
        case 'recover':
          await Profile.recover(options);
          break;
        case 'read':
          await new Profile(options?.name).read(options);
          break;
        case 'add':
          await new Profile(options?.name).add(options);
          break;
        case 'delete':
          await new Profile(options?.name).delete(options);
          break;
        case 'list':
          await new Profile(options?.name).list();
          break;
        case 'switch':
          await new Profile(options?.name).switch(options);
          break;
        case 'backup':
          await new Profile(options?.name).backup(options);
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