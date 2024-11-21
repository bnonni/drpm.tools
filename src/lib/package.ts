
import {mkdir, writeFile} from 'fs/promises';
import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../utils/logger.js';
import { ResponseUtils } from '../utils/response.js';
import { DpkMetadata } from '../utils/types.js';
import { Web5Connection } from './dweb5.js';
import dwn from '../utils/dwn/protocol.js';
import { DateSort } from '@tbd54566975/dwn-sdk-js';
type PackageReleaseParams = {
  parentId: string;
  name: string;
  version: string;
  integrity: string;
  data: any;
  connection: Web5Connection
};
type CompilerOptions = {
  target: string;
  module: string;
  moduleResolution: string;
  strict: boolean;
  declaration: boolean;
  declarationMap: boolean;
  sourceMap: boolean;
  esModuleInterop: boolean;
  resolveJsonModule: boolean;
  skipLibCheck: boolean;
  declarationDir: string;
  outDir: string;
}
type TsConfig = Record<string, unknown> & {
  compilerOptions: CompilerOptions;
  include: string[];
  exclude: string[];
};
type PackageInitOptions = {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
    ts?: boolean;
    src?: boolean;
    main?: string;
    type?: string;
    tsconfig?: TsConfig;
};
// Collecting TypeScript configuration
const tsConfigDefault = {
  compilerOptions : {
    target            : 'ES5',
    module            : 'CommonJS',
    moduleResolution  : 'Node',
    strict            : true,
    declaration       : true,
    declarationMap    : true,
    sourceMap         : true,
    esModuleInterop   : true,
    resolveJsonModule : true,
    skipLibCheck      : true,
    declarationDir    : 'dist/types',
    outDir            : 'dist',
  },
  include : ['src'],
  exclude : ['node_modules']
};

export class Package {
  static async buildTsConfig(options: TsConfig) {
    const tsConfig = tsConfigDefault;
    const compilerOptions = options?.compilerOptions ?? tsConfig.compilerOptions;

    Logger.log('---------- TSConfig Setup ----------');

    const useDefaults = await Inquirer.select({
      message : 'Would you like to use project defaults for tsconfig.json?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    if(useDefaults){
      Logger.log('Using tsconfig.json defaults:', tsConfig);
      return tsConfig;
    }

    compilerOptions.target = await Inquirer.select({
      message : 'Compiler Option: target',
      choices : [
        'ES5',
        'ES6',
        'ES2015',
        'ES2016',
        'ES2017',
        'ES2018',
        'ES2019',
        'ES2020',
        'ES2021',
        'ES2022',
        'ES2023',
        'ESNext',
      ],
      default : compilerOptions.target,
    });

    compilerOptions.module = await Inquirer.select({
      message : 'Compiler Option: module',
      choices : [
        'CommonJS',
        'ES6',
        'ES2015',
        'ES2020',
        'ES2022',
        'ESNext',
        'Node16',
        'NodeNext'
      ],
      default : compilerOptions.target === 'ES5'
        ? compilerOptions.module
        : 'ES2015',
    });

    compilerOptions.moduleResolution = await Inquirer.select({
      message : 'Compiler Option: moduleResolution',
      choices : [
        'Classic',
        'Node',
        'Node16',
        'ES2022',
        'NodeNext',
        'Bundler',
      ],
      default : ['ES6', 'ES2015'].includes(compilerOptions.module)
        ? 'Classic'
        : ['Node16', 'NodeNext'].includes(compilerOptions.module)
          ? compilerOptions.module
          : 'Node'
    });

    compilerOptions.strict = await Inquirer.select({
      message : 'Compiler Option: enable strict mode?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.declaration = await Inquirer.select({
      message : 'Compiler Option: Generate declaration files?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.declarationMap = await Inquirer.select({
      message : 'Compiler Option: Generate declaration map files?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.sourceMap = await Inquirer.select({
      message : 'Compiler Option: Generate source map files?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.esModuleInterop = await Inquirer.select({
      message : 'Compiler Option: esModuleInterop?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.resolveJsonModule = await Inquirer.select({
      message : 'Compiler Option: resolveJsonModule?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.skipLibCheck = await Inquirer.select({
      message : 'Compiler Option: skipLibCheck?',
      choices : ['Yes', 'No'],
      default : 'Yes',
    }) === 'Yes';

    compilerOptions.declarationDir = await Inquirer.input({
      message : 'Compiler Option: declarationDir',
      default : compilerOptions.declarationDir,
    });

    compilerOptions.outDir = await Inquirer.input({
      message : 'Compiler Option: outDir',
      default : compilerOptions.outDir,
    });

    tsConfig.exclude = options.exclude ?? await Inquirer.input({
      message : 'TSConfig Option: exclude',
      default : `[${tsConfig.exclude.join(', ')}]`,
    });

    tsConfig.include = options.include ??  await Inquirer.input({
      message : 'TSConfig Option: exclude',
      default : `[${tsConfig.include.join(', ')}]`,
    });

    return tsConfig;
  }

  static async init({
    name,
    version,
    description,
    author,
    license,
    ts,
    src,
    main,
    type,
    tsconfig = tsConfigDefault,
  }: PackageInitOptions = {}) {
    Logger.info('Welcome to the DRPM DPK template wizard!');
    try {
      tsconfig ??= JSON.parse(tsconfig) ?? tsConfigDefault;
    } catch (error: any) {
      Logger.error(error.message);
      Logger.warn('PackageCommand: Failed to parse tsconfig from CLI, using default');
    }

    name ??= await Inquirer.input({
      message     : 'DPK Name:',
      required    : true,
      default     : 'my-dpk',
      transformer : (value) => value.replace('@drpm', '')
    });

    version ??= await Inquirer.input({
      message  : 'Version:',
      required : true,
      default  : '0.1.0'
    });

    description ??= await Inquirer.input({
      message  : 'Description:',
      required : true,
      default  : 'My Decentralized Package'
    });

    author ??= await Inquirer.input({
      message : 'Author Name or DID:'
    });

    license ??= await Inquirer.input({
      message  : 'License:',
      required : true,
      default  : 'Apache-2.0'
    });

    src ??= await Inquirer.select({
      message : 'Use src/ directory?',
      choices : ['Yes', 'No'],
      default  : 'Yes'
    }) === 'Yes';

    ts ??= await Inquirer.select({
      message : 'Use TypeScript?',
      choices : ['Yes', 'No'],
      default  : 'Yes'
    }) === 'Yes';

    main ??= await Inquirer.input({
      message  : 'Main:',
      required : true,
      default  : ts
        ? './dist/cjs/index.js'
        : './src/index.js'
    });

    type ??= await Inquirer.select({
      message : 'Build type:',
      choices : ['commonjs', 'module'],
    });

    const tsConfigTemplate = ts
      ? await this.buildTsConfig(tsconfig)
      : undefined;
    // homepage
    // bugs
    // repository
    // contributors
    // keywords
    // devDependencies
    const packageContent = {
      name,
      version,
      type,
      description,
      main,
      author,
      license,
      dependencies : {},
      scripts      : { start: `node ${main}` }
    };

    // Create package directory
    const srcDir = src ? `${name}/src` : name;
    await mkdir(srcDir, { recursive: true });
    await writeFile(`${srcDir}/index.ts`, 'console.log("Hello, World!");');

    // Write package.json to disk
    await writeFile(`${name}/package.json`, JSON.stringify(packageContent, null, 2));
    Logger.log('Generated package.json');

    // Create a custom .npmrc file with settings
    await writeFile(`${name}/.npmrc`, `//localhost:2092/:_authToken="dummy-token"
    @drpm:registry=http://localhost:2092
    `);
    Logger.log('Generated .npmrc with custom settings');

    if(tsConfigTemplate) {
      await writeFile(`${name}/tsconfig.json`, JSON.stringify(tsConfigTemplate, null, 2));
      Logger.log('Generated tsconfig.json');
    }
    Logger.log(`New DPK project ${packageContent.name} created successfully!`);
  }

  static async publish(options: any): Promise<void> {
    try {
      const publishType = options.type.toLowerCase();
      Logger.log(`Publishing ${options.type} record!`);
      if(publishType === 'package') {
        await this.metadata(options);
      } else if(publishType.includes('release')) {
        await this.release(options);
      } else {
        await this.metadata(options);
        await this.release(options);
      }
    } catch (error: any) {
      Logger.error(`Error during package metadata or release publishing: ${error.message}`);
      throw error;
    }
  }

  static async metadata({ data, connection }: { data: DpkMetadata; connection: Web5Connection }) {
    try {
      const { web5, did } = connection ?? {};
      const { 'dist-tags': distTags, name } = data ?? {};
      const { record: _package = null, status } = await web5.dwn.records.create({
        store   : true,
        data    : data,
        message : {
          published    : true,
          dataFormat   : 'application/json',
          schema       : dwn.types.package.schema,
          protocolPath : 'package',
          protocol     : dwn.protocol,
          tags         : { name, latest: distTags.latest },
        },
      });

      if (ResponseUtils.dwnFail({ status }) || !_package) {
        Logger.error('Failed to create local package record', status);
        throw new Error('Failed to create package record');
      }

      const {status: sent} = await _package.send(did);
      Logger.log('Package metadata record created and sent to remote!', {status, sent});

    } catch (error: any) {
      Logger.error('Error during package metadata record creation', error);
      throw error;
    }
  }

  static async release({
    parentId,
    name,
    version,
    integrity,
    data,
    connection,
  }: PackageReleaseParams) {
    try {
      const { web5, did } = connection ?? {};
      if(!parentId) {
        if(!(name && version)) {
          throw new Error(`PublishRelease: Either parentId or ${!name ? 'name' : !version ? 'version' : 'name and version'} required`);
        }
        Logger.info('No parentId present, querying ...');
        const { records = [], status } = await web5.dwn.records.query({
          message : {
            dateSort : DateSort.CreatedDescending,
            filter   : {
              tags : { name, version }
            }
          }
        });
        if(!records.length || ResponseUtils.dwnFail({ status })) {
          Logger.error('Failed to find parent package metadata record', status);
          throw new Error('Failed to find parent package metadata record');
        }
        parentId = records[0].parentId;
        if(!parentId) {
          throw new Error('Parent package metadata record not found');
        }
        Logger.info('Parent package metadata record found!', parentId);
      }

      const { record: release = null, status } = await web5.dwn.records.create({
        data,
        store   : true,
        message : {
          published       : true,
          parentContextId : parentId,
          dataFormat      : 'application/gzip',
          schema          : dwn.types.release.schema,
          protocolPath    : 'package/release',
          protocol        : dwn.protocol,
          tags            : { name, version, integrity }
        },
      });

      if (ResponseUtils.dwnFail({ status }) || !release) {
        Logger.error('Failed to create local release record', status);
        throw new Error('Failed to create release record');
      }

      Logger.log('Local release record created!', status);
      const {status: sent} = await release.send(did);
      Logger.log('Release record created and sent to remote!', {status, sent});

    } catch (error: any) {
      Logger.error('Error during release record creation', error);
      throw error;
    }
  }

  static async run(options: any): Promise<void> {
    throw new Error('Method not implemented ' + options);
  }
}