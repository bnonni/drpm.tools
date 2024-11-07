import { Context } from '../../drpm/context/index.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class ContextCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      switch (subcommand) {
        case 'create':
          await Context.create(options);
          break;
        case 'read':
          await Context.read(options);
          break;
        case 'update':
          await Context.update(options);
          break;
        case 'delete':
          await Context.delete(options);
          break;
        case 'recover':
          await Context.recover(options);
          break;
        case 'backup':
          await Context.backup(options);
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