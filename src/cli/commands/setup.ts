import { Setup } from '../../lib/setup.js';
import { Logger } from '../../utils/logger.js';
import { ICommand } from '../drpm.js';

export class SetupCommand implements ICommand {
  public async execute(): Promise<void> {
    try {
      Logger.log(`Running DRPM setup!`);
      await Setup.run();
    } catch (error: any) {
      Logger.error(error.message);
      process.exit(1);
    }
  }
}
