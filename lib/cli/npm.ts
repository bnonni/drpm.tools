import { execSync } from 'child_process';
import { Logger } from '../utils/logger.js';
import { join } from 'path';

export const processCwd = process.cwd();
export const localPkgJsonPath = join(processCwd, 'package.json');
export const localPkgLockJsonPath = join(processCwd, 'package-lock.json');

export function runNpmCommand(command: string, args: string = '') {
  try {
    const npmCommand = `npm ${command} ${args}`;
    Logger.debug(`Running ${npmCommand}`);
    execSync(npmCommand, { stdio: 'inherit' });
  } catch (error) {
    Logger.error(`Failed to run npm ${command}:`, error);
  }
}