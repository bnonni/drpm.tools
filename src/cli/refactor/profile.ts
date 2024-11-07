import { Profile } from '../../drpm/profile/index.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class ProfileCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      switch (subcommand) {
        case 'create':
          await Profile.create(options);
          break;
        case 'read':
          await Profile.read(options);
          break;
        case 'update':
          await Profile.update(options);
          break;
        case 'delete':
          await Profile.delete(options);
          break;
        case 'switch':
          await Profile.switch(options);
          break;
        case 'list':
          await Profile.list();
          break;
        case 'recover':
          await Profile.recover(options);
          break;
        default:
          throw new DRegistryPackageManagerError(`ProfileCommand: Unknown action ${subcommand}`);
      }
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }
}