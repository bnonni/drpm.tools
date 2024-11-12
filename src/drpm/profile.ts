import * as Inquirer from '@inquirer/prompts';
import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDir } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { DEFAULT_PASSWORD, DEFAULT_PROFILE, DRPM_HOME, DRPM_PROFILE } from '../config.js';
import { Setup } from '../lib/setup.js';
import formatter from '../utils/formatter.js';
import { Logger } from '../utils/logger.js';
import { createPassword, secureProfile, secureProfileContext, stringifier } from '../utils/misc.js';
import { ProfileJson } from '../utils/types.js';
import { Context } from './context.js';

type ProfileBackup = {
  data: string;
  salt: string;
  iv: string;
  authTag: string;
}

export class Profile {
  static data: ProfileJson;
  static context: Context;

  constructor() {
    if(!this.exists()) {
      Logger.error('ProfileError: No profile found.');
      this.create();
    }
    if(!this.isSetup()) {
      Logger.error('ProfileError: Setup not completed.');
      // TODO: run setup? await Setup.run();
      // process.exit(1);
    }
    Profile.loadStaticSync();
    Profile.context = new Context(Profile.data.name);
  }

  isSetup(): boolean {
    return Setup.isDone();
  }

  static loadStaticSync(): ProfileJson {
    this.data = JSON.parse(readFileSync(DRPM_PROFILE, 'utf8'));
    return this.data;
  }

  create(): void {
    writeFileSync(DRPM_PROFILE, stringifier(DEFAULT_PROFILE));
  }

  // Helper function to validate profile data
  valid(data?: ProfileJson): boolean | ProfileJson {
    if(!data) {
      Logger.error('ProfileError: No profile data found.');
      return false;
    }
    const { did, password, dwnEndpoints, web5DataPath } = data?.[data?.name] ?? {};
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
  exists(profile?: ProfileJson, method?: string): boolean | ProfileJson {
    try {
      profile ??= Profile.data;
      if(!profile) return false;

      const data = profile[profile.name ?? method];
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
    Profile.data = JSON.parse(profile);
    return Profile.data;
  }

  static async staticSave(): Promise<void> {
    const profile = Profile.data ?? this.loadStaticSync();
    await writeFile(DRPM_PROFILE, stringifier(profile), 'utf8');
    Logger.log('Saved profile.json', secureProfile(Profile.data));
  }

  async save(): Promise<void> {
    const profile = Profile.data ?? this.load();
    await writeFile(DRPM_PROFILE, stringifier(profile), 'utf8');
    Logger.log('Saved profile.json', secureProfile(Profile.data));
  }

  async read(options: { text?: boolean }): Promise<void> {
    Logger.plain('DRPM Profile:', options.text ?? false ? Profile.data : secureProfile(Profile.data));
  }

  async add(options: any): Promise<void> {
    // TODO: implement add
    throw new Error('ProfileCommand: add not implemented: ' + options);
  }

  encrypt({ password }:{ password: string }): ProfileBackup {
    password ??= createPassword();
    const jsonString = JSON.stringify(Profile.data);
    const salt = randomBytes(16);
    const iv = randomBytes(12);

    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const cipher = createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(jsonString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      data    : encrypted,
      salt    : salt.toString('hex'),
      iv      : iv.toString('hex'),
      authTag : authTag
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
        Object.keys(Profile.data)
          .filter((key) => key !== 'name')
          .map((key, i) => `  ${i+1}. ${key.trim()} (${key === Profile.data.name ? formatter.green('active') : formatter.red('inactive')})`).join('\n')
      }`);
  }

  // Subcommand function to switch between profiles
  async switch({ name }: { name?: string }): Promise<void> {
    if(name) {
      Profile.data.name = name;
    } else {
      const choices = Object.keys(Profile.data)
        .filter((key) => key !== 'name')
        .map((key) => `${key.trim()} (${key === Profile.data.name ? 'active' : 'inactive'})`);
      const name: string = await Inquirer.select({ choices, message: 'Which profile context would you like to switch to?' });
      Profile.data.name = name.replace(/ \(.*\)/, '');
    }
    await this.save();
    const profile = Profile.data;
    const activeName = Profile.data.name;
    const context = profile[activeName];
    Logger.log(`Switched profile context to ${activeName}: ${secureProfileContext(context)}`);
  }

  static async recover({ password, file }: { password: string; file: string }): Promise<void> {
    const profileBackup: ProfileBackup = JSON.parse(await readFile(file, 'utf8'));
    const { data, salt, iv, authTag } = profileBackup ?? {};
    if(!(data && salt && iv && authTag)) {
      Logger.error(`ProfileError: Invalid backup file ${file}`);
      process.exit(1);
    }

    const key = pbkdf2Sync(password, Buffer.from(salt, 'hex'), 100000, 32, 'sha256');
    const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    Profile.data = JSON.parse(decrypted);

    await this.staticSave();
    Logger.log(`Recovered profile.json from backup ${file}`);
  }


  async backup({ password }: {password: string}): Promise<void> {
    const writePassword = !password;
    password ??= createPassword();
    const jsonString = JSON.stringify(Profile.data);
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    let encryptedData = cipher.update(jsonString, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const encrypted = {
      data    : encryptedData,
      salt    : salt.toString('hex'),
      iv      : iv.toString('hex'),
      authTag : cipher.getAuthTag().toString('hex')
    };
    const encryptedDir = `${DRPM_HOME}/bak/${encrypted.authTag}`;
    await ensureDir(encryptedDir);
    if(writePassword) await writeFile(`${encryptedDir}/profile.key`, password, 'utf8');
    await writeFile(`${encryptedDir}/profile.enc`, stringifier(encrypted), 'utf8');
    Logger.log(`Backed up profile.json to ${encryptedDir}`, encrypted);
  }
}