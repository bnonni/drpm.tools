import { DWeb5 } from '../../lib/dweb5.js';
import { Package } from '../../lib/package.js';
import { Profile } from '../../lib/profile.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';
import { DRegistryPackageManagerError } from './error.js';

export class PackageCommand implements ICommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string }): Promise<void> {
    try {
      if (!subcommand) {
        throw new DRegistryPackageManagerError('PackageCommand: No subcommand provided');
      }
      options.connection = await DWeb5.connect({ name: options.name ?? Profile.loadStaticSync().name });
      switch (subcommand) {
        case 'init':
        case 'create':
          await Package.init(options);
          break;
        case 'publish metadata':
          await Package.metadata(options);
          break;
        case 'publish release':
          await Package.release(options);
          break;
        case 'run':
          await Package.run(options);
          break;
        default:
          throw new DRegistryPackageManagerError(`PackageCommand: Unknown subcommand ${subcommand}`);
      }
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }
}