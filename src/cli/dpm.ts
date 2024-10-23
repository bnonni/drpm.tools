#!/usr/bin/env node
import { Web5 } from '@web5/api';
import { program } from 'commander';
import { DEFAULT_DATAPATH, PACKAGE_VERSION } from '../config.js';
import { ProfileCommand } from './commands/profile.js';
import { ProtocolCommand } from './commands/protocol.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';

export class DPM {
  static async connect() {
    if(!await ProfileCommand.exists()) {
      throw new Error('DPM: No profile found. Please create one or update the existing one.');
    }
    const {password, dwnEndpoints} = await ProfileCommand.load();
    Logger.info(`Using profile ${cleanProfile({password, dwnEndpoints})} to connect to Web5 ...`);
    return await Web5.connect({
      password,
      sync             : 'off',
      didCreateOptions : { dwnEndpoints },
      techPreview      : { dwnEndpoints },
    });
  }
}

program.version(
  `dpm v${PACKAGE_VERSION}\nDecentralized Package Manager CLI`,
  '-v, --version',
  'Output the current version'
);

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
  .addHelpText('afterAll', '\nCreate new profile\ndpm profile create -e https://dwn.mydomain.org')
  .addHelpText('afterAll', '\nSet multiple fields at once\ndpm profile set -d did:example:abc123 -p "correct horse battery staple" -e https://dwn.mydomain.org')
  .addHelpText('afterAll', '\nSet your did\ndpm profile set -d did:example:abc123 ')
  .addHelpText('afterAll', '\nSet your password\ndpm profile set -p "correct horse battery staple"')
  .addHelpText('afterAll', '\nSet your endpoint\ndpm profile set -e https://dwn.mydomain.org');

/* ---- PROFILE CREATE ---- */
profileCommand
  .command('create')
  .description('Create a new DPM profile')
  .option('-p, --password <PASSWORD>', 'Secure password to protect your local DRPM DWN data')
  .option('-e, --dwnEndpoints <ENDPOINT>',
    'Your Decentralized Web Node (DWN) endpoint; Only pass 1 endopoint, e.g. https://dwn.example.com or http://localhost:3000')
  .action(async (args) => await ProfileCommand.create(args));

/* ---- PROFILE SET ---- */
profileCommand
  .command('set')
  .description('Set your DPM profile')
  .option('-d, --did <DID>', 'Your Decentralized Identifier (DID)')
  .option('-p, --password <PASSWORD>', 'Secure password to protect your local DRPM DWN data')
  .option('-e, --dwnEndpoints <ENDPOINT>',
    'Your Decentralized Web Node (DWN) endpoint; ' +
    'e.g. https://dwn.example.com, dwn.example.com or http://localhost:3000')
  .option('-w, --web5DataPath <WEB5DATAPATH>',
    'Desired path location to store your web5 data (keys, dwn data, etc.); ' +
    'Must be an absolute path. default: $HOME/.drpm/DATA')
  .action(async (args) => await ProfileCommand.set(args));

/* ---- PROFILE GET ---- */
profileCommand.command('get')
  .description('Get your DPM profile data. If no options passed, full profile will be printed.')
  .option('-d, --did', 'Get your Decentralized Identifier (DID)')
  .option('-p, --password', 'Get your password in plain text')
  .option('-e, --dwnEndpoints', 'Get your Decentralized Web Node (DWN) endpoint')
  .option('-w, --web5DataPath', `Get your web5 data storage path (default: ${DEFAULT_DATAPATH})`)

  .action(async (args) => await ProfileCommand.get(args));
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
  .command('metadata')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

publishCommand
  .command('package')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

program.parse();
