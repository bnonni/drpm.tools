#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DRPM_HOME } from '../../config.js';
import { ProfileCommand } from '../commands/profile.js';
import { ProtocolCommand } from '../commands/protocol.js';
import { RegistryCommand } from '../commands/registry.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(__dirname, '..', '..', 'package.json');

export const CLI_VERSION = await readFile(packageJsonPath, 'utf8')
  .then(data => JSON.parse(data).version)
  .catch(() => 'latest');

program.version(`drpm ${CLI_VERSION}\nDecentralized Registry Package Manager CLI`, '-v, --version', 'Output the current version');

/**
 * -------- PROFILE -------- *
 * - create: Create a new DRPM profile
 * - read: Read your DRPM profile
 * - update: Update your DRPM profile
 * - delete: Delete your DRPM profile
 * - list: TODO
 * - switch: TODO
 */
const profile = program
  .command('profile')
  .description('Interacts with a DRPM profile')
  .addHelpText('after', `
    Examples:
      drpm profile create  # Create a new DRPM profile
      drpm profile read    # Read your DRPM profile
      drpm profile update  # Update your DRPM profile
      drpm profile delete  # Delete your DRPM profile
      drpm profile switch  # Switch your DRPM profile
      drpm profile list    # List available DRPM profiles
      drpm profile recover # Recover your DRPM profile
  `);

/* ---- PROFILE CREATE ---- */
profile
  .command('create')
  .description('Create a new DRPM profile')
  .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Provide one or more DWN endpoints to use (required)')
  .option('-p, --password <PASSWORD>', 'Supply your own password (optional, default: random partial mnemonic)')
  .option('-w, --web5DataPath <WEB5DATAPATH>', `Set your own web5 DATA dir path  (optional, default: ${DRPM_HOME}/DATA/DHT/AGENT)`)
  .option('-m, --method <METHOD>', 'Use an specific did method (default: dht)')
  .addHelpText('after', `
    Examples:
      drpm profile create -e https://dwn.mydomain.org                         # Create new profile with 1 DWN endpoint; DWN Endpoints required
      drpm profile create -e https://dwn.example.com,http://localhost:3000    # Create new profile with multiple DWN endpoints; DWN Endpoints required
      drpm profile create -m web -u example.com                               # Create new profile with did:web method; URL required
  `)
  .action(async (options) => await ProfileCommand.create(options));

/* ---- PROFILE read ---- */
profile
  .command('read')
  .description('Read values from the current DRPM profile')
  .option('-d, --did', 'Read the DID')
  .option('-p, --password', 'Read the password in plain text')
  .option('-r, --recoveryPhrase', 'Read the recovery phrase in plain text')
  .option('-e, --dwnEndpoints', 'Read the DWN endpoints')
  .option('-w, --web5DataPath', `Read the web5 DATA dir path`)
  .addHelpText('after', `
    Examples:
      drpm profile read       # Returns the profile
      drpm profile read -d    # Returns the profile.did
      drpm profile read -p    # Returns the profile.password
      drpm profile read -r    # Returns the profile.recoveryPhrase
      drpm profile read -e    # Returns the profile.dwnEndpoints
      drpm profile read -w    # Returns the profile.web5DataPath
  `)
  .action(async (options) => await ProfileCommand.read(options));

/* ---- PROFILE UPDATE ---- */
profile
  .command('update')
  .description('Update values in the current DRPM profile')
  .option('-d, --did <DID>', 'Update the DID')
  .option('-p, --password <PASSWORD>', 'Update the password')
  .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Update the recovery phrase')
  .option('-e, --dwnEndpoints <DWNENDPOINTS>', 'Update the DWN endpoints')
  .option('-w, --web5DataPath <WEB5DATAPATH>', `Update the path to the web5 DATA dir`)
  .addHelpText('after', `
    Examples:
      drpm profile update -d did:example:abc123                # Update the DID
      drpm profile update -p "correct horse battery staple"    # Update the password
      drpm profile update -e https://dwn.mydomain.org          # Update the DWN endpoint
  `)
  .action(async (options) => await ProfileCommand.update(options));


/* ---- PROFILE UPDATE ---- */
profile
  .command('delete')
  .description('Delete all or parts of your DRPM profile')
  .option('-m, --method <METHOD>', 'Use an specific did method (default: dht)')
  .option('-c, --current', 'Use an specific did method (default: dht)')
  .option('-a, --all', 'Use an specific did method (default: dht)')
  .addHelpText('after', `
    Examples:
      drpm profile update -d did:example:abc123                # Update the DID
      drpm profile update -p "correct horse battery staple"    # Update the password
      drpm profile update -e https://dwn.mydomain.org          # Update the DWN endpoint
  `)
  .action(async (options) => await ProfileCommand.delete(options));


/* ---- PROFILE SWITCH ---- */
profile
  .command('switch')
  .description('Switch between different DID profiles')
  .option('-d, --dht', 'Switch to did:dht method')
  .option('-w, --web', 'Switch to did:web method')
  .option('-b, --btc', 'Switch to did:btc method')
  .addHelpText('after', `
    Examples:
        drpm profile switch       # Switch to another profile from the available list
        drpm profile switch -d    # Switch to your did:dht profile
        drpm profile switch -w    # Switch to your did:web profile
        drpm profile switch -b    # Switch to your did:btc profile
  `)
  .action(async (options) => await ProfileCommand.switch(options));

/* ---- PROFILE LIST ---- */
profile
  .command('list')
  .description('Switch between different DID profiles')
  .option('-d, --dht', 'Switch to did:dht method')
  .option('-w, --web', 'Switch to did:web method')
  .option('-b, --btc', 'Switch to did:btc method')
  .addHelpText('after', `
    Examples:
        drpm profile list    # Lists out available profiles
  `)
  .action(async () => await ProfileCommand.list());

/* ---- PROFILE RECOVER ---- */
// TODO: Implement profile recover
profile
  .command('recover')
  .description('Recover an existing DRPM profile')
  .option('-d, --did <DID>', 'Supply the DID to recover (required)')
  .option('-r, --recoveryPhrase <RECOVERYPHRASE>', 'Supply the mnemonic recovery phrase (required)')
  .addHelpText('after', 'Only available for did:dht')
  .action(async () => await ProfileCommand.recover());

/* ------------------------------------------------------------------------------------------------ */

/**
 * -------- PROFILE -------- *
 * - create: Create a new DRPM profile
 * - read: Read your DRPM profile
 * - update: Update your DRPM profile
 * - delete: Delete your DRPM profile
 * - list: TODO
 * - switch: TODO
 */
const context = program
  .command('context')
  .description('Interact with the current profile context')
  .addHelpText('after', `
    Examples:
      drpm context delete     # Delete the current profile context
      drpm context backup     # Backup the current profile context
      drpm context export     # Export the current profile context and data to a file
  `);

context.command('');
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

/* ------------------------------------------------------------------------------------------------ */

/**
 * -------- DPK -------- *
 * - install: install a DPK (package/release record) from your DWN
 * - publish: publish full DPK (package and package/release record) to your DWN
 */
const dpk = program
  .command('dpk')
  .description('Install and publish full DPKs (package and package/release records) from and to your DWN');

dpk
  .command('install')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

dpk
  .command('publish')
  .action(async () => {
    throw new Error('Not implemented yet');
  });

/* ------------------------------------------------------------------------------------------------ */

/**
 * -------- PROTOCOL -------- *
 * - configure: configure your dwn with the DRPM protocol
 * - query: TODO
 */
const registry = program
  .command('registry')
  .description('Interact with DRG (DRPM registry).');

registry
  .description('Start the DRPM registry.')
  .command('start')
  .action(async () => await RegistryCommand.start());

program.parse();
