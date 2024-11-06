#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ProfileCommand } from './profile.js';
import { ProtocolCommand } from './protocol.js';
import { RegistryCommand } from './registry.js';
import { DRPM_HOME, DRPM_PROFILE } from '../../config.js';

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
  .description(`Interact with your DRPM profile (location: ${DRPM_PROFILE}`)
  .addHelpText('after',
    `Examples:
      drpm profile create    # Create a new DRPM profile
      drpm profile read      # Read your DRPM profile
      drpm profile update    # Update your DRPM profile
      drpm profile delete    # Delete your DRPM profile
      drpm profile switch    # Switch your DRPM profile
      drpm profile list      # List available DRPM profiles
      drpm profile recover   # Recover your DRPM profile`
  );

/* ---- PROFILE UPDATE ---- */



/* ---- PROFILE UPDATE ---- */


/* ---- PROFILE SWITCH ---- */


/* ------------------------------------------------------------------------------------------------ */

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