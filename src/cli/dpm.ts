#!/usr/bin/env node
import { program } from 'commander';
import { Logger } from '../utils/logger.js';

program
  .command('install')
  .description('Install dependencies')
  .action(() => {
    Logger.log('Installing dependencies...');
  });
program.parse();