import { DWeb5 } from '../../drpm/dweb5.js';
import { DwnProtocols, DwnRecords, DwnSync } from '../../drpm/dwn.js';
import { Profile } from '../../drpm/profile.js';
import { Logger } from '../../utils/logger.js';
import { DRegistryPackageManagerError } from './error.js';

export class DwnCommand {
  async execute({ options, subcommand }: { options?: any; subcommand?: string}): Promise<void> {
    try {
      const name = options.name ?? Profile.staticLoad().name;
      options.connection = await DWeb5.connect({ name });
      switch (subcommand) {
        case 'protocols': {
          const protocols = new DwnProtocols();
          if(options.action === 'configure') {
            await protocols.configure();
          } else if (options.action === 'query') {
            await protocols.query();
          }
        }
          break;
        case 'records': {
          const records = new DwnRecords();
          if(options.action === 'create') {
            await records.create();
          } else if (options.action === 'read') {
            await records.read();
          } else if (options.action === 'update') {
            await records.update();
          } else if (options.action === 'delete') {
            await records.delete();
          }
          break;
        }
        case 'sync': {
          const sync = new DwnSync();
          if(options.action === 'start') {
            await sync.start();
          } else if (options.action === 'stop') {
            await sync.stop();
          } else if (options.action === 'sync') {
            await sync.sync();
          }
          break;
        }
        default:
          throw new DRegistryPackageManagerError(`ProfileCommand: Unknown subcommand ${subcommand}`);
      }
    } catch (error: any) {
      Logger.error(error.message);
      throw error;
    }
  }
}