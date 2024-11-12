#!/usr/bin/env node

import { Command, program } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DRPM_HOME, DRPM_PROFILE } from '../config.js';
import { ConnectCommand } from './commands/connect.js';
import { ContextCommand } from './commands/context.js';
import { PackageCommand } from './commands/package.js';
import { ProfileCommand } from './commands/profile.js';
import { RegistryCommand } from './commands/registry.js';
import { SetupCommand } from './commands/setup.js';
import { DwnCommand } from './commands/dwn.js';
import { Logger } from '../utils/logger.js';

export const DEFAULT_DATAPATH = `${DRPM_HOME}/DHT/<ENDPOINT>/<0|cuid>/DATA/AGENT)`;

export interface ICommand {
  static async execute({ options, subcommand, }: { options?: any; subcommand?: string; }): Promise<void>;
}

export type CommandType =
  | ConnectCommand
  | ContextCommand
  | PackageCommand
  | ProfileCommand
  | RegistryCommand
  | SetupCommand
  | DwnCommand;

class DRegistryPackageManager {
  public DRPM: Command = program;
  public VERSION: string = 'latest';

  constructor() {
    this.addDetails();
    this.addCommands();
  }

  private addProfileCommands() {
    /* ============ PROFILE COMMANDS ============ */
    const profile = new ProfileCommand({
      parent   : this.DRPM.command('profile').description(`Manage your profile (location: ${DRPM_PROFILE}`),
      commands : [
        {
          name        : 'read',
          description : 'Prints the entire profile.json',
          option      : {
            flags       : '-t, --text',
            description : 'Prints the profile in plain text'
          },
          helpText : {
            location : 'after',
            description: `Examples:\n  drpm profile read       # Returns the profile.json`
          },
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'read' })
        },
        {
          name        : 'delete',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
        {
          name        : 'add',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
        {
          name        : 'list',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
        {
          name        : 'switch',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
        {
          name        : 'backup',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
        {
          name        : 'recover',
          description : '',
          option      : {
            flags       : '',
            description : ''
          },
          helpText :{location: '', description: ''},
          action: async (options) => await this.invokeCommand({ options, command: ProfileCommand, subcommand: 'delete' })
        },
      ],
    });
    // drpm profile
    // const profile = this.DRPM.command('profile').description(`Manage your profile (location: ${DRPM_PROFILE}`);
    // profile read
    profile.parent.command('read')
      .description('Prints the entire profile.json')
      .option('-t, --text', 'Prints the profile in plain text')
      .addHelpText('after', `Examples:\n  drpm profile read       # Returns the profile.json`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'read' }));
    // profile delete
    profile.parent.command('delete')
      .description('Delete the current profile.json')
      .option('-f, --force', 'Force delete the profile.json without backing up')
      .option('-p, --password [PASSWORD]', `Provide a custom password to encypt backup (default: random saved to ${DRPM_HOME}/bak/<randhex>/profile.key)`)
      .addHelpText('after',
        `Examples:
          drpm profile delete                                      # Delete profile.json, creates backup w/ random password
          drpm profile delete -p "correct horse battery staple"    # Delete profile.json, creates backup w/ custom password`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'delete' }));
    // profile add
    profile.parent.command('add')
      .description('Add a new context to profile.json')
      .option('-n, --name <NAME>', 'Name of the context to add; Names are based on DID Methods')
      .allowUnknownOption()
      .addHelpText('after', `Examples:\n  drpm profile add -n btc1 {...}    # Adds a new profile context called btc1`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'add' }));
    // profile list
    profile.parent.command('list')
      .description('Shows a list of available profile contexts')
      .addHelpText('after',
        `Examples:\n  drpm profile list    # Lists out available profile contexts`)
      .action(async () => await this.invokeCommand({ command: profileCommand, subcommand: 'list' }));
    // profile switch
    profile.parent.command('switch')
      .description('Switch between different DID profiles.')
      .option('-n, --name <NAME>', 'Name of the context to switch to; Names are based on DID Methods')
      .addHelpText('after',
        `Examples:
           drpm profile switch           # Display a list of available profiles to switch to
           drpm profile switch -n dht    # Switch to your dht profile
           drpm profile switch -n web    # Switch to your web profile
           drpm profile switch -n btc    # Switch to your btc profile`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'switch' }));
    // profile backup
    profile.parent.command('backup')
      .description('Backup the current profile.json file')
      .option('-p, --password [PASSWORD]', `Provide a custom password to encypt backup (default: random written to ${DRPM_HOME}/profile.key)`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'backup' }));
    // profile recover
    profile.parent.command('recover')
      .description('Recover an existing profile.json from a backup file and password')
      .option('-f, --file <FILEPATH>', 'Path to a profile.enc backup file')
      .option('-p, --password <PASSWORD>', 'Provide the password to decrypt the profile backup (default: profile.key in same dir as profile.enc')
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'recover' }));
  }

  private addContextCommands() {
    /* ============ CONTEXT COMMANDS ============ */
    const contextCommand = new ContextCommand();
    const context = this.DRPM.command('context').description('Interact with different profile contexts');
    // context create
    context.command('create')
      .description('Create a new profile context')
      .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Provide one or more DWN endpoints')
      .option('-p, --password <PASSWORD>', 'Provide a password to encrypt Web5 data (default: random)')
      .option('-w, --web5DataPath <WEB5DATAPATH>', `Provide file path for storing Web5 data (default: ${DEFAULT_DATAPATH})`)
      .option('-m, --method <METHOD>', 'Provide a desired did method (default: dht)')
      .option('-d, --did <METHOD>', 'The method specific id; Required for -m web (e.g. did:web:example.com => example.com)')
      .addHelpText('after',
        `Examples:
          drpm profile create -e https://dwn.mydomain.org                         # Create new profile with 1 DWN endpoint (REQUIRED: -e)
          drpm profile create -e https://dwn.example.com,http://localhost:3000    # Create new profile with multiple DWN endpoints (REQUIRED: -e))
          drpm profile create -m web -d example.com                               # Create new profile with did:web method (REQUIRED: -d)`
      )
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'create' }));
    // context read
    context.command('read')
      .description('Read values from the current profile context')
      .option('-d, --did', 'Read the DID')
      .option('-p, --password', 'Read the password in plain text')
      .option('-r, --recoveryPhrase', 'Read the recovery phrase in plain text')
      .option('-e, --dwnEndpoints', 'Read the DWN endpoints')
      .option('-w, --web5DataPath', `Read the web5 DATA dir path`)
      .addHelpText('after',
        `Examples:
          drpm profile read       # Returns the profile
          drpm profile read -d    # Returns the profile.did
          drpm profile read -p    # Returns the profile.password
          drpm profile read -r    # Returns the profile.recoveryPhrase
          drpm profile read -e    # Returns the profile.dwnEndpoints
          drpm profile read -w    # Returns the profile.web5DataPath`
      )
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'read' }));
    // context update
    context.command('update')
      .description('Update values in the current profile context')
      .option('-d, --did <DID>', 'Update the DID')
      .option('-p, --password <PASSWORD>', 'Update the password')
      .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Update the recovery phrase')
      .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Update the DWN endpoints')
      .option('-w, --web5DataPath <WEB5DATAPATH>', `Update the path to the web5 DATA dir`)
      .addHelpText('after',
        `Examples:
          drpm profile update -d did:example:abc123                # Update the profile.did
          drpm profile update -p "correct horse battery staple"    # Update the profile.password
          drpm profile update -e https://dwn.mydomain.org          # Update the profile.dwnEndpoints`
      )
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'update' }));
    // context delete
    context.command('delete')
      .description('Delete the current profile context')
      .option('-f, --force', 'Force delete the profile context')
      .option('-p, --password [PASSWORD]', `Provide a custom password to encypt backup (default: random saved to ${DRPM_HOME}/bak/<randhex>/profile.key)`)
      .addHelpText('after',
        `Examples:
          drpm profile delete                                      # Delete profile.json, creates backup w/ random password
          drpm profile delete -p "correct horse battery staple"    # Delete profile.json, creates backup w/ custom password`
      )
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'delete' }));
    // TODO: context backup
    /*context.command('backup')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'backup' }));*/
    // TODO: context recover
    /*context.command('recover')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'recover' }));*/
  }

  private addPackageCommands() {
    /* ============ PACKAGE COMMANDS ============ */
    const packageCommand = new PackageCommand();
    const dpackage = this.DRPM.command('package').description('Run a dpk file containing DPIs without installing deps');
    dpackage.command('init')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: 'init' }));

    dpackage.command('create')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: 'create' }));

    dpackage.command('publish')
      .option('-d, --did <DID>', 'The did to use to publish the package')
      .option('-t, --type <TYPE>', 'The type of record to publish to (package or package/release)')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: 'publish' }));

    dpackage.command('run')
      .description('Run a given JS file containing DPIs without installing DPKs')
      .option('-f, --file <FILE>', 'The file to run')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: 'run' }));
  }

  private addRegistryCommands() {
    /* ============ REGISTRY COMMANDS ============ */
    const registryCommands = new RegistryCommand();
    this.DRPM.command('registry')
      .description('Interact with the registry server')
      .command('start')
      .action(async (options) => await this.invokeCommand({ command: registryCommands, options }));
  }

  private addDwnCommands() {
    /* ============ DWN COMMANDS ============ */
    const dwnCommand = new DwnCommand();
    this.DRPM.command('dwn')
      .description('Create a DPK tarball from your project files')
      .action(async (options) => await this.invokeCommand({ command: dwnCommand, options }));
  }

  private addCommands() {
    this.DRPM.command('setup')
      .description('Runs the setup script in src/lib/setup.ts to ensure various local env requirements are met')
      .action(async () => await this.invokeCommand({ command: new SetupCommand() }));

    this.DRPM.command('connect')
      .description('Connect to web5 using the current profile context or the context provided with -n')
      .option('-n, --name <NAME>', 'Name of the context to use to connect')
      .action(async (options) => await this.invokeCommand({ command: new ConnectCommand(), options }));

    this.addProfileCommands();
    this.addContextCommands();
    this.addRegistryCommands();
    this.addPackageCommands();
    this.addDwnCommands();
  }


  private addDetails() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const packageJsonPath = join(__dirname, '..', '..', 'package.json');
    try {
      const data = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      this.VERSION = data.version;
    } catch (error) {
      Logger.error('Error reading package.json:', error);
    }
    this.DRPM.name('drpm');
    this.DRPM.version(`Decentralized Registry Package Manager (drpm) v${this.VERSION} `,'-v, --version', 'Output the current version');
  }


  async invokeCommand({ command, options, subcommand }: { command: CommandType; options?: any; subcommand?: string; }) {
    try {
      await command.execute({ options, subcommand });
      process.exit(0);
    } catch (error) {
      console.error('Error executing command:', error);
    }
  }

  run() {
    this.DRPM.parse();
  }
}

// Initialize and run the CLI
export default new DRegistryPackageManager().run();
