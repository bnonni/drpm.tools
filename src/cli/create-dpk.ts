#!/usr/bin/env node

import { Package } from '../lib/package.js';
import { Logger } from '../utils/logger.js';

try {
  await Package.init();
} catch (error: any) {
  Logger.error(error.message);
  process.exit(1);
}