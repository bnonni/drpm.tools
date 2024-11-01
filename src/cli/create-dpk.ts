#!/usr/bin/env node

import {writeFile} from 'fs/promises';
import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../utils/logger.js';

async function init() {
  Logger.log('Welcome to create-dpk!');

  // Prompt user for package details
  const name = await Inquirer.input({ message: 'dPackage name:', default: '@drpm/my-dpk' });
  const version = await Inquirer.input({ message: 'Version:', default: '0.1.0' });
  const description = await Inquirer.input({ message: 'Description:', default: 'My Decentralized Package' });
  const author = await Inquirer.input({ message: 'Author:' });
  const license = await Inquirer.input({ message: 'License:', default: 'Apache-2.0' });
  const src = await Inquirer.input({ message: 'Use src/ directory [y/N]:', default: 'y' });
  const main = await Inquirer.input({ message: 'Main:', default: 'index.js' });
  //   const did = await Inquirer.input({ message: 'Publisher DID:', default: 'did:web:localhost:2092' });

  // Define custom package.json content
  const packageContent = {
    name,
    version,
    description,
    main,
    author,
    license,
    type         : 'module',
    dependencies : {},
    scripts      : {
      start : 'node index.js'
    }
  };

  // Write package.json to disk
  writeFile('package.json', JSON.stringify(packageContent, null, 2));
  Logger.log('Generated package.json');

  // Create a custom .npmrc file with settings
  const npmrcContent = `//localhost:2092/:_authToken="dummy-token"
  @drpm:registry=http://localhost:2092
  `;

  writeFile('.npmrc', npmrcContent);
  Logger.log('Generated .npmrc with custom settings');

  // Optionally create additional boilerplate files here
}
