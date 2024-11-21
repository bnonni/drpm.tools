import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../utils/logger.js';
import { secureProfileContext, stringifier } from '../utils/misc.js';
import { ContextOptions, DhtProfileCreate, ProfileContext, WebProfileCreate } from '../utils/types.js';
import { DhtProfile } from './utils/dht.js';
import { WebProfile } from './utils/web.js';
import { Profile } from './profile.js';

export class Context {
  name: string;
  data: ProfileContext;
  constructor(name: string, context: ProfileContext) {
    this.name = name;
    this.data = context;
  }

  get(): ProfileContext {
    return this.data;
  }

  save(options: { name?: string; context?: ProfileContext } = {}): void {
    this.name = options.name ?? this.name;
    this.data = options.context ?? this.data;
    Profile.json[this.name] = this.data;
    Logger.log(`Saved ${this.name} profile context!`);
  }

  async create(params: DhtProfileCreate | WebProfileCreate): Promise<void> {
    try {
      const { dwnEndpoints, method = 'dht', did } = params;
      if(!dwnEndpoints) {
        Logger.error('DWN endpoints required to create a new profile.');
        process.exit(1);
      }

      if(method == 'web' && !did) {
        Logger.error('DID required to create a new web profile.');
        process.exit(1);
      }
      const { [method]: context } = method === 'dht'
        ? await DhtProfile.create(params)
        : method === 'web' && did
          ? await WebProfile.create(params as WebProfileCreate)
          : {};

      if(!context) {
        Logger.error(`Failed to create ${method} profile, exiting ...`, context);
        process.exit(1);
      }

      Profile.json.name = method;
      Profile.json[method] = context;
      Logger.log(`Created ${method} profile: ${stringifier(context)}`);
    } catch (error: any) {
      Logger.error(`Failed to create profile: ${error.message}`);
      process.exit(1);
    }
  }

  read(options: ContextOptions): void {
    const optionKeys = Object.keys(options);
    !optionKeys.length
      ? Logger.plain(`${this.name.toUpperCase()} Profile:\n${secureProfileContext(this.data)}`)
      : optionKeys.forEach((key) => {
        if (this.data[key as keyof ProfileContext]) {
          Logger.plain(`${key}: ${this.data[key as keyof ProfileContext]}`);
        } else {
          Logger.error(`ProfileError: ${key} not found in profile.`);
        }
      });
  }

  update(options: ContextOptions): void {
    this.data = {
      did            : options.did ?? this.data.did,
      password       : options.password ?? this.data.password,
      recoveryPhrase : options.recoveryPhrase ?? this.data.recoveryPhrase,
      dwnEndpoints   : !options.dwnEndpoints ? this.data.dwnEndpoints : options.dwnEndpoints.split(','),
      web5DataPath   : options.web5DataPath ?? this.data.web5DataPath,
    };
    Logger.log(`Updated ${this.name} profile context: ${secureProfileContext(this.data)}`);
  }

  async delete({ password, force }: { password: string; force?: boolean }): Promise<void> {
    const delName = this.name;
    const answer: string = force
      ? 'Force'
      : await Inquirer.select({
        choices : ['Yes', 'No'],
        message : `Are you sure you want to delete the ${delName} profile context?`
      }) ?? 'No';

    if(answer === 'No') {
      Logger.log('Cancelling deletion');
      return process.exit(0);
    }

    if(password) {
      // do encrypted backup
      Logger.log('Creating encrypted backup of profile.json');
      // TODO: implement backup
    } else {
      Logger.log('Creating unencypted backup of profile.json');
    }


    this.data = {
      did            : undefined,
      dwnEndpoints   : undefined,
      web5DataPath   : undefined,
      password       : undefined,
      recoveryPhrase : undefined
    } as Partial<ProfileContext> as ProfileContext;
    this.name = '';
    Logger.log(`Deleted profile context ${delName} from profile.json`);
  }

  recover(options: any): void {
    throw new Error('Context: recover not implemented: ' + options);
  }

  backup(options: any): void {
    throw new Error('Context: backup not implemented: ' + options);
  }
}
