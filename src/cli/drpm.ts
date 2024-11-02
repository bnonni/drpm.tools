#!/usr/bin/env node

import { program } from 'commander';
import { ProfileCommand } from './commands/profile.js';
import { ProtocolCommand } from './commands/protocol.js';
import { readFile } from 'fs/promises';
import { homedir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', '..', 'package.json');

export const DRPM_HOME = `${process.env.HOME || homedir()}/.config/drpm`;
export const CLI_VERSION = await readFile(packageJsonPath, 'utf8')
  .then(data => JSON.parse(data).version)
  .catch(() => 'latest');
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

program.version(`drpm ${CLI_VERSION}\nDecentralized Registry Package Manager CLI`, '-v, --version', 'Output the current version');

/**
 * -------- PROFILE -------- *
 * - create: create a new profile
 * - set: set one or more profile fields
 * - get: print one or more profile fields
 * - delete: TODO
 * - list: TODO
 */
const profileCommand = program
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
profileCommand
  .command('create')
  .description('Create a new DPM profile')
  .option('-p, --password <PASSWORD>', 'Secure password to protect your local DRPM DWN data')
  .option('-m, --method <METHOD>', 'Did method to use for your profile; Accetps dht and web; (default: dht)')
  .option('-u, --url <URL>', 'URL of for your did web; (e.g. did:web:example.com)')
  .option('-e, --dwnEndpoint <ENDPOINT>', 'URL for your DWN endpoint; Only pass 1 endopoint, e.g. https://dwn.example.com or http://localhost:3000')
  .addHelpText('after', `
      Examples:
        drpm profile create -e https://dwn.mydomain.org    # Create new profile
        drpm profile set -d did:example:abc123             # Set your did
        drpm profile set -p "correct horse battery staple" # Set your password
        drpm profile set -e https://dwn.mydomain.org       # Set your dwn endpoint
        drpm profile get -d                                # Get your did
        drpm profile get -p                                # Get your password
        drpm profile get -e                                # Get your dwn endpoint
      `)
  .action(async (args) => await ProfileCommand.create(args));

/* ---- PROFILE SET ---- */
profileCommand
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
profileCommand
  .command('get')
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
  .option('-d, --did', 'Get your Decentralized Identifier (DID)')
  .option('-p, --password', 'Get your password in plain text')
  .option('-e, --dwnEndpoint', 'Get your Decentralized Web Node (DWN) endpoint')
  .option('-w, --web5DataPath', `Get your web5 data storage path (default: ${DEFAULT_WEB5DATAPATH})`)
  .addHelpText('after', `
    Examples:
      drpm profile get              # Get full profile
      drpm profile get -d           # Get your DID
      drpm profile get -p           # Get your password
      drpm profile get -e           # Get your DWN endpoint
      drpm profile get -w           # Get your web5 data path
    `)
  .action(async (args) => await ProfileCommand.get(args));

/* ---- PROFILE SWITCH ---- */
profileCommand
  .command('switch')
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
  .option('-m, --method', 'Profile to switch to (based on did method: dht, web, btc)')
  .action(async (args) => await ProfileCommand.switch(args));
/* ---- PROFILE ---- */

/**
 * -------- PROTOCOL -------- *
 * - configure: configure your dwn with the DRPM protocol
 * - query: TODO
 */
const protocolCommand = program
  .command('protocol')
  .description('Configure your DWN with the DRPM protocol.');

/* ---- PROTOCOL CONFIGURE ---- */
protocolCommand
  .command('configure')
  .action(async () => await ProtocolCommand.configure());

/* ---- PROTOCOL QUERY ---- */
protocolCommand
  .command('query')
  .action(async () => await ProtocolCommand.query());
/* ---- PROTOCOL ---- */

/**
 * -------- PUBLISH -------- *
 * - configure: configure your dwn with the DRPM protocol
 * - query: TODO
 */
const publishCommand = program
  .command('publish')
  .description('Publish metadata and/or packages to your DWN');

publishCommand
  .command('package')
  .command('metadata')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

publishCommand
  .command('release')
  .command('tarball')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

program.parse();
