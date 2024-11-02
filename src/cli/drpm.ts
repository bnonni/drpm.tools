#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ProfileCommand } from './commands/profile.js';
import { ProtocolCommand } from './commands/protocol.js';
import { DEFAULT_WEB5DATAPATH } from '../config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', '..', 'package.json');

export const CLI_VERSION = await readFile(packageJsonPath, 'utf8')
  .then(data => JSON.parse(data).version)
  .catch(() => 'latest');

program.version(`drpm ${CLI_VERSION}\nDecentralized Registry Package Manager CLI`, '-v, --version', 'Output the current version');

/**
 * -------- PROFILE -------- *
 * - create: create a new profile
 * - set: set one or more profile fields
 * - get: print one or more profile fields
 * - delete: TODO
 * - list: TODO
 */
const profile = program
  .command('profile')
  .description('Interact with your DPM profile')
  .addHelpText('after', `
    Examples:
      drpm profile create           # Create a new profile
      drpm profile set              # Set your profile
      drpm profile get              # Get your profile
      drpm profile switch           # Switch your profile
    `);

/* ---- PROFILE CREATE ---- */
profile
  .command('create')
  .description('Create a new DPM profile')
  .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Provide one or more DWN endpoints to use (required)')
  .option('-p, --password <PASSWORD>', 'Supply your own password (optional, default: random partial mnemonic)')
  .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Supply your own recovery phrase (optional, default: creates new mnemonic)')
  .option('-m, --method <METHOD>', 'Use an alternative did method (optional, default: dht)')
  .option('-u, --url <URL>', 'Provide did web URL (required, if using did:web)')
  .addHelpText('after', `
      Examples:
        drpm profile create -e https://dwn.mydomain.org                         # Create new profile with 1 DWN endpoint; DWN Endpoints required
        drpm profile create -e https://dwn.example.com,http://localhost:3000    # Create new profile with multiple DWN endpoints; DWN Endpoints required
        drpm profile create -m web -u example.com                               # Create new profile with did:web method; URL required
    `)
  .action(async (args) => await ProfileCommand.create(args));

/* ---- PROFILE SET ---- */
profile
  .command('set')
  .description('Set your DPM profile')
  .option('-d, --did <DID>', 'Set the DID')
  .option('-p, --password <PASSWORD>', 'Set the password (protects local DWN data)')
  .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Set the recovery phrase (for agent key recovery)')
  .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Set the DWN endpoints')
  .option('-w, --web5DataPath <WEB5DATAPATH>', `Set the web5 DATA folder path (default: ${process.cwd()}/DATA)`)
  .addHelpText('after', `
    Examples:
        drpm profile set -d did:example:abc123                # Set the DID
        drpm profile set -p "correct horse battery staple"    # Set the password
        drpm profile set -e https://dwn.mydomain.org          # Set the DWN endpoint
  `)
  .action(ProfileCommand.set);

/* ---- PROFILE GET ---- */
profile
  .command('get')
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
  .option('-d, --did', 'Get the DID')
  .option('-p, --password', 'Get the password in plain text')
  .option('-r, --recoveryPhrase', 'Get the recovery phrase (for agent key recovery)')
  .option('-e, --dwnEndpoints', 'Get the DWN endpoints')
  .option('-w, --web5DataPath', `Get the web5 data storage path (default: ${DEFAULT_WEB5DATAPATH})`)
  .addHelpText('after', `
    Examples:
      drpm profile get       # Print the full profile
      drpm profile get -d    # Print the profile DID
      drpm profile get -p    # Print the profile password
      drpm profile get -e    # Print the profile DWN endpoints
      drpm profile get -w    # Print the profile web5 data path
      drpm profile get -r    # Print the profile recovery phrase
    `)
  .action(ProfileCommand.get);


/* ---- PROFILE SWITCH ---- */
profile
  .command('switch')
  .description('Switch between different DID profiles.')
  .option('-d, --dht', 'Switch to did:dht method')
  .option('-w, --web', 'Switch to did:web method')
  .option('-b, --btc', 'Switch to did:btc method')
  .addHelpText('after', `
    Examples:
        drpm profile switch {-d|--dht}    # Switch to your did:dht profile
        drpm profile switch {-w|--web}    # Switch to your did:web profile
        drpm profile switch {-b|--btc}    # Switch to your did:btc profile
  `)
  .action(async (args) => await ProfileCommand.switch(args));

/**
 * -------- PROTOCOL -------- *
 * - configure: configure your dwn with the DRPM protocol
 * - query: TODO
 */
const protocol = program
  .command('protocol')
  .description('Configure your DWN with the DRPM protocol.');

/* ---- PROTOCOL CONFIGURE ---- */
protocol
  .command('configure')
  .action(async () => await ProtocolCommand.configure());

/* ---- PROTOCOL QUERY ---- */
protocol
  .command('query')
  .action(async () => await ProtocolCommand.query());

/**
 * -------- PUBLISH -------- *
 * - configure: configure your dwn with the DRPM protocol
 * - query: TODO
 */
const publishCommand = program
  .command('dpk')
  .description('Publish metadata and/or packages to your DWN');

publishCommand
  .command('publish')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

program.parse();
