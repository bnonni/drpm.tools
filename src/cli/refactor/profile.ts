
import { Command } from 'commander';
import { Profile } from '../../drpm/profile/index.js';
import { ProfileError } from '../../utils/errors.js';
import {
  DrpmProfileCreateParams,
  DrpmProfileOptions
} from '../../utils/types.js';

export class ProfileCommand {
  constructor(program: Command) {
    const profile = program
      .command('profile')
      .description('Interacts with a DRPM profile');

    this.addCreateCommand(profile);
    this.addReadCommand(profile);
    this.addUpdateCommand(profile);
    this.addDeleteCommand(profile);
    this.addSwitchCommand(profile);
    this.addListCommand(profile);
  }

  private addCreateCommand(profile: Command) {
    profile
      .command('create')
      .description('Create a new DRPM profile')
      .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Provide one or more DWN endpoints to use (required)')
      .option('-p, --password <PASSWORD>', 'Supply your own password (optional)')
      .action(async (options: DrpmProfileCreateParams) => {
        try {
          await Profile.create(options);
        } catch (error) {
          console.error(`Failed to create profile: ${error.message}`);
        }
      });
  }

  private addReadCommand(profile: Command) {
    profile
      .command('read')
      .description('Read values from the current DRPM profile')
      .option('-d, --did', 'Read the DID')
      .option('-p, --password', 'Read the password in plain text')
      .action(async (options: DrpmProfileOptions) => {
        try {
          await Profile.read(options);
        } catch (error) {
          console.error(`Failed to read profile: ${error.message}`);
        }
      });
  }

  // Additional methods for update, delete, switch, list, etc.
}
