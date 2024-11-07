#!/usr/bin/env node

import { Command, program } from 'commander';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DRPM_HOME, DRPM_PROFILE } from '../config.js';
import { Logger } from '../utils/logger.js';
import { ConnectCommand } from './refactor/connect.js';
import { ContextCommand } from './refactor/context.js';
import { PackageCommand } from './refactor/package.js';
import { ProfileCommand } from './refactor/profile.js';
import { RegistryCommand } from './refactor/registry.js';
import { RunCommand } from './refactor/run.js';
import { SetupCommand } from './refactor/setup.js';
import { DwnCommand } from './refactor/dwn.js';

export const DEFAULT_DATAPATH = `${DRPM_HOME}/DATA/<method>/AGENT/<dwnEndpoint>)`;

export interface ICommand {
  execute({ options, subcommand, }: { options?: any; subcommand?: string; }): Promise<void>;
}

export type CommandType =
  | ConnectCommand
  | ProfileCommand
  | PackageCommand
  | RegistryCommand
  | RunCommand;

class DRegistryPackageManager {
  public DRPM: Command = program;
  public VERSION: string = 'latest';

  constructor() {
    this.addDetails();
    this.addCommands();
  }

  private addDetails() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const packageJsonPath = join(__dirname, '..', '..', 'package.json');

    readFile(packageJsonPath, 'utf8')
      .then((data) => (this.VERSION = JSON.parse(data).version))
      .catch(Logger.error);

    this.DRPM.name('drpm');
    this.DRPM.version(
      `drpm ${this.VERSION}
        Decentralized Registry Package Manager`,
      '-v, --version',
      'Output the current version'
    );
  }

  private addProfileCommands() {
    /* ============ PROFILE COMMANDS ============ */
    const profileCommand = new ProfileCommand();
    const profile = this.DRPM.command('profile').description(`Manage your profile (location: ${DRPM_PROFILE}`);
    profile
      .command('read')
      .description('Prints the entire profile.json')
      .option('-s, --secure', 'Prints the profile in a secure way')
      .addHelpText('after',
        `Examples:
           drpm profile read       # Returns the profile.json`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'read' }));
    profile
      .command('switch')
      .description('Switch between different DID profiles.')
      .option('-d, --dht', 'Switch to did:dht method')
      .option('-w, --web', 'Switch to did:web method')
      .option('-b, --btc', 'Switch to did:btc method')
      .addHelpText('after',
        `Examples:
           drpm profile switch       # Switch to another profile from the available list
           drpm profile switch -d    # Switch to your did:dht profile
           drpm profile switch -w    # Switch to your did:web profile
           drpm profile switch -b    # Switch to your did:btc profile`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'switch' }));
    profile
      .command('list')
      .description('Shows a list of available profile contexts')
      .addHelpText('after',
        `Examples:
           drpm profile list    # Lists out available profile contexts`)
      .action(async () => await this.invokeCommand({ command: profileCommand, subcommand: 'list' }));
    profile
      .command('add')
      .description('Add a new profile context to profile.json')
      .option('-m, --method <METHOD>', 'Provide the desired did method')
      .allowUnknownOption()
      .addHelpText('after',
        `Examples:
           drpm profile add -m btc1    # Adds a new profile with did:btc1 method`)
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'add' }));
    profile
      .command('recover')
      .description('Recover an existing DRPM profile.')
      .option('-f, --file <FILEPATH>', 'Path to a profile.json backup')
      .option('-p, --password <PASSWORD>', 'Provide the password to decrypt the profile backup, if encrypted')
      .addHelpText('after', 'Only available for did:dht')
      .action(async (options) => await this.invokeCommand({ options, command: profileCommand, subcommand: 'recover' }));
  }

  private addContextCommands() {
    /* ============ CONTEXT COMMANDS ============ */
    const contextCommand = new ContextCommand();
    const context = this.DRPM.command('context').description('Publish package or release records to your DWN');
    context.command('create')
      .description('Create a new DRPM profile context')
      .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Provide one or more DWN endpoints')
      .option('-p, --password <PASSWORD>', 'Provide a password to encrypt Web5 data (default: random)')
      .option('-w, --web5DataPath <WEB5DATAPATH>', `Provide file path for storing Web5 data (default: ${DEFAULT_DATAPATH})`)
      .option('-m, --method <METHOD>', 'Provide a desired did method (default: dht)')
      .addHelpText('after',
        `Examples:
          drpm profile create -e https://dwn.mydomain.org                         # Create new profile with 1 DWN endpoint; DWN Endpoints required
          drpm profile create -e https://dwn.example.com,http://localhost:3000    # Create new profile with multiple DWN endpoints; DWN Endpoints required
          drpm profile create -m web -u example.com                               # Create new profile with did:web method; URL required`)
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'create' }));
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
        drpm profile read -w    # Returns the profile.web5DataPath`)
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'read' }));
    context
      .command('update')
      .description('Update values in the current DRPM profile context')
      .option('-d, --did <DID>', 'Update the DID')
      .option('-p, --password <PASSWORD>', 'Update the password')
      .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Update the recovery phrase')
      .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Update the DWN endpoints')
      .option('-w, --web5DataPath <WEB5DATAPATH>', `Update the path to the web5 DATA dir`)
      .addHelpText('after',
        `Examples:
          drpm profile update -d did:example:abc123                # Update the DID
          drpm profile update -p "correct horse battery staple"    # Update the password
          drpm profile update -e https://dwn.mydomain.org          # Update the DWN endpoint`)
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'update' }));
    context.command('delete')
      .description('Delete all or parts of your DRPM profile')
      .option('-p, --password [PASSWORD]', `Provide your own password used to encypt backup pre-deletion (default: random, ${DRPM_HOME}/profile-bak.key)`)
      .addHelpText('after',
        `Examples:
        drpm profile delete                                   # Delete the profile.json file and let drpm create a random password
        drpm profile delete -p "correct horse battery staple" # Update the password`)
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'delete' }));
    context.command('backup')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'backup' }));
    context.command('recover')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: contextCommand, subcommand: 'recover' }));
  }

  private addPackageCommands() {
    /* ============ PACKAGE COMMANDS ============ */
    const packageCommand = new PackageCommand();
    const dpackage = this.DRPM.command('package').description('Run a dpk file containing DPIs without installing deps');
    dpackage.command('init')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));

    dpackage.command('create')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));

    dpackage.command('publish')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));

    dpackage.command('install')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));

    dpackage.command('run')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));

    dpackage.command('pack')
      .description('Add a new profile context to profile.json')
      .action(async (options) => await this.invokeCommand({ options, command: packageCommand, subcommand: '' }));
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
      .description('Setup DRPM')
      .action(async (options) => await this.invokeCommand({ command: new SetupCommand(), options }));

    this.DRPM.command('connect')
      .description('Connect to web5 with DRPM using current profile context')
      .action(async (options) => await this.invokeCommand({ command: new ConnectCommand(), options }));

    this.addProfileCommands();
    this.addContextCommands();
    this.addRegistryCommands();
    this.addPackageCommands();
    this.addDwnCommands();
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
