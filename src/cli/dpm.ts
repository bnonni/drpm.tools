#!/usr/bin/env node
import { program } from 'commander';
import {
  DEFAULT_DATAPATH,
  DEFAULT_PROFILE,
  DRPM_HOME,
  DRPM_PROFILE,
  PACKAGE_VERSION
} from '../config.js';
import { DpmProfile } from './commands/profile.js';
import { DpmProtocol } from './commands/protocol.js';
import { ensureDir, ensureFile, exists, writeFile } from 'fs-extra';

program.version(
  `dpm v${PACKAGE_VERSION}\nDecentralized Package Manager CLI`,
  '-v, --version',
  'Output the current version'
);

// Config command to set keys in .drpm_profile
const profileCommand = program
  .command('profile')
  .description('Configure profile data for DRPM.');

profileCommand
  .command('set')
  .description('Configure profile data for DRPM.')
  .option('-a, --action <action>', 'The action to take on your profile; Options: set, get')
  .option('-d, --did <did>', 'Your Decentralized Identifier (DID)')
  .option('-p, --password <password>', 'Secure password to protect your local DRPM DWN data')
  .option('-e, --dwnEndpoint <dwnEndpoint>', 'Your Decentralized Web Node (DWN) endpoint; e.g. https://dwn.example.com or dwn.example.com')
  .option('-s, --storagePath <dataPath>', 'Path to your local DRPM DWN data; Must be an absolute path (default: $HOME/.drpm/USERNAME/DATA')
  .action(async (args) => {
    if(!await exists(DRPM_HOME)) {
      await ensureDir(DRPM_HOME);
    }

    if(!await exists(DRPM_PROFILE)) {
      await ensureFile(DRPM_PROFILE);
      await writeFile(DRPM_PROFILE, JSON.stringify(DEFAULT_PROFILE, null, 2));
    }

    const profile = await this.loadProfile();
    if(!profile.dataPath) {
      profile.dataPath = DEFAULT_DATAPATH;
    }

    await DpmProfile.set(args);
  });

// Configure DWN command
program
  .command('protocol')
  .option('-a, --action <action>', 'actions to perform with the DRPM protocol')
  .description('Configure your DWN with the DRPM protocol.')
  .action(async ({ action }) => {
    if (action === 'configure')
      await DpmProtocol.configure();
    else
      throw new Error('Invalid action provided');
  });

// Publish command
program
  .command('publish')
  .description('Publish package and package/release records to DWN and npmjs.org registry.')
  .allowUnknownOption()
  .action(async (args) => {
    const packages: string[] = [];
    const flags: string[] = [];
    args.filter((arg: string) => (arg.startsWith('-') || arg.startsWith('--'))
      ? flags.push(arg)
      : packages.push(arg));
  });

program.parse();
