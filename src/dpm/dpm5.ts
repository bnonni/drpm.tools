#!/usr/bin/env node
import { Web5 } from '@web5/api';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';
import { ProfileCommand } from './commands/profile.js';

export class DPM5 {
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