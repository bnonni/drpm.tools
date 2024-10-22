#!/usr/bin/env node
import { program } from 'commander';
import { NPM_PACKAGE_JSON } from '../config.js';
import { DpmProfile } from './profile.js';
import { DpmProtocol } from './protocol.js';

const {version} = NPM_PACKAGE_JSON;
program.version(`dpm v${version}\nDecentralized Package Manager`, '-v, --version', 'Output the current version');


// Config command to set keys in .drpm_profile
program
  .command('profile')
  .description('Configure profile data for DRPM.')
  .option('-a, --action <action>', 'The action to take on your profile; Options: set, get')
  .option('-d, --did <did>', 'Your Decentralized Identifier (DID)')
  .option('-p, --password <password>', 'Secure password to protect your local DRPM DWN data')
  .option('-e, --dwnEndpoint <dwnEndpoint>', 'Your Decentralized Web Node (DWN) endpoint; e.g. https://dwn.example.com or dwn.example.com')
  .option('-s, --storagePath <dataPath>', 'Path to your local DRPM DWN data; Must be an absolute path (default: $HOME/.drpm/USERNAME/DATA')
  .action(async (args) => await DpmProfile.run(args));

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
