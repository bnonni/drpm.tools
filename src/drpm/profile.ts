import * as Inquirer from '@inquirer/prompts';
import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { exists } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { DEFAULT_PASSWORD, DEFAULT_PROFILE, DRPM_HOME, DRPM_PROFILE } from '../config.js';
import formatter from '../utils/formatter.js';
import { Logger } from '../utils/logger.js';
import { createPassword, secureProfile, secureProfileContext, stringifier } from '../utils/misc.js';
import { ProfileJson } from '../utils/types.js';
import { Context } from './context.js';
type EncryptedProfile = { encrypted: string; salt: string; iv: string; authTag: string };

export class Profile {
  static json: ProfileJson;
  context: Context;

  constructor(current: string) {
    Profile.loadSync();
    this.context = new Context(current, Profile.json?.[current]);
  }

  static loadSync(): void {
    const profile = readFileSync(DRPM_PROFILE, 'utf8');
    this.json = JSON.parse(profile);
  }

  static loadStatic(): ProfileJson {
    this.loadSync();
    return this.json;
  }

  // Helper function to check if setup is needed
  async needSetup(): Promise<boolean> {
    return !(await exists(DRPM_HOME) || await exists(DRPM_PROFILE));
  }

  // Helper function to validate profile data
  valid(data?: ProfileJson): boolean | ProfileJson {
    if(!data) {
      Logger.error('ProfileError: No profile data found.');
      return false;
    }
    const { did, password, dwnEndpoints, web5DataPath } = data?.[data?.current] ?? {};
    // Check for empty or invalid DID
    if (!did || did.trim() === '') {
      Logger.error('ProfileError: DID cannot be blank.');
      return false;
    }
    // Check for empty or default password
    if (!password || password === DEFAULT_PASSWORD) {
      Logger.error('ProfileError: Password cannot be blank or set to the default password.');
      return false;
    }
    // Check that dwnEndpoint has at least one valid entry
    if (!Array.isArray(dwnEndpoints) || dwnEndpoints.length === 0) {
      Logger.error('ProfileError: DWN endpoint cannot be empty.');
      return false;
    }
    // Check if dataPath is empty or invalid
    if (!web5DataPath || web5DataPath.trim() === '') {
      Logger.error('ProfileError: Web5 Data Path cannot be empty.');
      return false;
    }
    // If no errors, return the profile
    return true;
  }

  // Helper function to check if a profile exists
  async exists(profile?: ProfileJson, method?: string): Promise<boolean | ProfileJson> {
    try {
      profile ??= await this.load();
      if(!profile) return false;

      const data = profile[profile.current ?? method];
      if(!data) return false;

      return profile;
    } catch (error: any) {
      Logger.error('ProfileCommand: Failed to load profile', error);
      return false;
    }
  }

  // Helper function to load existing profile or create a new one
  async load(): Promise<ProfileJson> {
    const profile = await readFile(DRPM_PROFILE, 'utf8');
    Profile.json = JSON.parse(profile);
    return Profile.json;
  }

  async save(): Promise<void> {
    const profile = Profile.json ?? await this.load();
    await writeFile(DRPM_PROFILE, stringifier(profile));
  }

  async read(options: { text?: boolean }): Promise<void> {
    Logger.plain('DRPM Profile:', options.text ?? false ? Profile.json : secureProfile(Profile.json));
  }

  async add(options: any): Promise<void> {
    // TODO: implement add
    throw new Error('ProfileCommand: add not implemented: ' + options);
  }

  encrypt({ password }:{password: string}): EncryptedProfile {
    const jsonString = JSON.stringify(Profile.json);
    const salt = randomBytes(16);
    const iv = randomBytes(12);

    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const cipher = createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(jsonString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      encrypted,
      salt          : salt.toString('hex'),
      iv            : iv.toString('hex'),
      authTag       : authTag
    };
  }

  // Function to decrypt JSON


  async delete({ password, force }: { password: string; force?: boolean }): Promise<void> {
    password ??= createPassword();

    const answer: string = force
      ? 'Force'
      : await Inquirer.select({
        choices : ['Yes', 'No'],
        message : 'Are you sure you want to delete profile.json?'
      }) ?? 'No';


    if(answer === 'No') {
      Logger.log('Cancelling deletion');
      return process.exit(0);
    }

    if(answer !== 'Force' ) {
      const encrypted = this.encrypt({ password });
      const encryptedFilepath = `${DRPM_HOME}/profile-${encrypted.authTag}.enc`;
      await writeFile(encryptedFilepath, stringifier(encrypted));
      Logger.log(`Created encrypted backup at ${encryptedFilepath}`);
    } else {
      Logger.log('Creating encrypted backup of profile.json');
      await writeFile(DRPM_PROFILE, stringifier(DEFAULT_PROFILE));
      Logger.log('Deleted all profiles!');
    }
  }

  async list(): Promise<void> {
    Logger.plain(
      `Available Profile Contexts:\n${
        Object.keys(Profile.json)
          .filter((key) => key !== 'name')
          .map((key, i) => `  ${i+1}. ${key.trim()} (${key === this.context.name ? formatter.green('active') : formatter.red('inactive')})`).join('\n')
      }`);
  }

  // Subcommand function to switch between profiles
  async switch({ name }: { name?: string }): Promise<void> {
    if(name) {
      Profile.json.name = name;
    } else {
      const choices = Object.keys(Profile.json)
        .filter((key) => key !== 'name')
        .map((key) => `${key.trim()} (${key === this.context.name ? 'active' : 'inactive'})`);
      const name: string = await Inquirer.select({ choices, message: 'Which profile context would you like to switch to?' });
      Profile.json.name = name.replace(/ \(.*\)/, '');
    }
    await this.save();
    const profile = Profile.json;
    const activeName = Profile.json.name;
    const context = profile[activeName];
    Logger.log(`Switched profile context to ${activeName}: ${secureProfileContext(context)}`);
  }

  async recover({ password, file }: { password: string; file: string }): Promise<void> {
    const recoveryFile = JSON.parse(await readFile(file, 'utf8'));
    const { encrypted, salt, iv, authTag } = recoveryFile ?? {};
    const saltBuffer = Buffer.from(salt, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const authTagBuffer = Buffer.from(authTag, 'hex');

    const key = pbkdf2Sync(password, saltBuffer, 100000, 32, 'sha256');
    const decipher = createDecipheriv('aes-256-gcm', key, ivBuffer);
    decipher.setAuthTag(authTagBuffer);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    Profile.json = JSON.parse(decrypted);
    await this.save();
    Logger.log(`Recovered backup ${file}!`);
  }


  async backup({ password }: {password: string}): Promise<void> {
    password ??= createPassword();
    const encrypted = this.encrypt({ password });
    Logger.log('Backed up profile.json!', encrypted);
    await writeFile(`${DRPM_HOME}/profile-${encrypted.authTag}.enc`, stringifier(encrypted));
  }
}
