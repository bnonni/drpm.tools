import { Profile } from '../../drpm/profile.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class ContextCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      const name = options?.name ?? Profile.loadStaticSync().name;
      const profile = new Profile(name);
      switch (subcommand) {
        case 'create':
          await profile.context.create(options);
          await profile.save();
          break;
        case 'read':
          profile.context.read(options);
          break;
        case 'update':
          profile.context.update(options);
          profile.context.save({ name: profile.context.name, context: profile.context.data });
          break;
        case 'delete':
          profile.context.delete(options);
          profile.context.save({ name: profile.context.name, context: profile.context.data });
          break;
        case 'backup':
          profile.context.backup(options);
          break;
        case 'recover':
          profile.context.recover(options);
          break;
        default:
          throw new DRegistryPackageManagerError(`ContextCommand: Unknown action ${subcommand}`);
      }
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }
}