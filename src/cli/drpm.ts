#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from 'fs/promises';
<<<<<<< Updated upstream
import { homedir } from 'os';

export const CLI_VERSION = await readFile('../../.version', 'utf8').catch(() => '4.0.2');
export const DRPM_HOME = `${process.env.HOME || homedir()}/.config/drpm`;
export const DRPM_PROFILE = `${DRPM_HOME}/profile.json`;
export const DEFAULT_WEB5DATAPATH = `${DRPM_HOME}/DATA`;
export const DEFAULT_PASSWORD = 'insecure-static-password';
export const DEFAULT_PROFILE = {
  default : 'dht',
  dht     : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : '',
    password       : `dht-${DEFAULT_PASSWORD}`
  },
  web : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : '',
    password       : `web-${DEFAULT_PASSWORD}`
  },
  btc : {
    did            : '',
    dwnEndpoints   : [],
    recoveryPhrase : '',
    password       : `btc-${DEFAULT_PASSWORD}`
  }
};
=======
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ProfileCommand } from './commands/profile.js';
import { ProtocolCommand } from './commands/protocol.js';
import { DEFAULT_WEB5DATAPATH } from '../drpm/profile.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', '..', 'package.json');

export const CLI_VERSION = await readFile(packageJsonPath, 'utf8')
  .then(data => JSON.parse(data).version)
  .catch(() => 'latest');
>>>>>>> Stashed changes

program.version(`drpm v${CLI_VERSION}\nDecentralized Registry Package Manager CLI`, '-v, --version', 'Output the current version');

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
  .addHelpText('afterAll', '\nCreate new profile\ndrpm profile create -e https://dwn.mydomain.org')
  .addHelpText('afterAll', '\nSet multiple fields at once\ndrpm profile set -d did:example:abc123 -p "correct horse battery staple" -e https://dwn.mydomain.org')
  .addHelpText('afterAll', '\nSet your did\ndrpm profile set -d did:example:abc123 ')
  .addHelpText('afterAll', '\nSet your password\ndrpm profile set -p "correct horse battery staple"')
  .addHelpText('afterAll', '\nSet your endpoint\ndrpm profile set -e https://dwn.mydomain.org');

/* ---- PROFILE CREATE ---- */
profile
  .command('create')
  .description('Create a new DPM profile')
  .option('-p, --password <PASSWORD>', 'Secure password to protect your local DRPM DWN data')
  .option('-m, --method <METHOD>', 'Did method to use for your profile; Accetps dht and web; (default: dht)')
  .option('-u, --url <URL>', 'URL of for your did web; (e.g. did:web:example.com)')
  .option('-e, --dwnEndpoint <ENDPOINT>',
    'Your Decentralized Web Node (DWN) endpoint; Only pass 1 endopoint, e.g. https://dwn.example.com or http://localhost:3000')
  .action(async (args) => await ProfileCommand.create(args));

/* ---- PROFILE SET ---- */
profile
  .command('set')
  .description('Set your DPM profile')
  .option('-d, --did <DID>', 'Your Decentralized Identifier (DID)')
  .option('-p, --password <PASSWORD>', 'Secure password to protect your local DRPM DWN data')
  .option('-e, --dwnEndpoint <ENDPOINT>',
    'Your Decentralized Web Node (DWN) endpoint; ' +
    'e.g. https://dwn.example.com, dwn.example.com or http://localhost:3000')
  .option('-w, --web5DataPath <WEB5DATAPATH>',
    'Desired path location to store your web5 data (keys, dwn data, etc.); ' +
    `Must be an absolute path. default: ${process.cwd()}/DATA`)
  .action(async (args) => await ProfileCommand.set(args));

/* ---- PROFILE GET ---- */
profile
  .command('get')
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
<<<<<<< Updated upstream
  .option('-d, --did', 'Get your Decentralized Identifier (DID)')
  .option('-p, --password', 'Get your password in plain text')
  .option('-e, --dwnEndpoint', 'Get your Decentralized Web Node (DWN) endpoint')
  .option('-w, --web5DataPath', `Get your web5 data storage path (default: ${DEFAULT_WEB5DATAPATH})`)
  .action(async (args) => await ProfileCommand.get(args));
=======
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
    `)
  .action(ProfileCommand.get);
>>>>>>> Stashed changes

/* ---- PROFILE SWITCH ---- */
profile
  .command('switch')
<<<<<<< Updated upstream
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
  .option('-m, --method', 'Profile to switch to (based on did method: dht, web, btc)')
=======
  .description('Switch between different DID profiles.')
  .option('-d, --dht', 'Switch to did:dht method')
  .option('-w, --web', 'Switch to did:web method')
  .option('-b, --btc', 'Switch to did:btc method')
  .addHelpText('after', `
    Examples:
        drpm profile switch --dht    # Switch to your did:dht profile
        drpm profile switch --web    # Switch to your did:web profile
        drpm profile switch --btc    # Switch to your did:btc profile
  `)
>>>>>>> Stashed changes
  .action(async (args) => await ProfileCommand.switch(args));
/* ---- PROFILE ---- */

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
