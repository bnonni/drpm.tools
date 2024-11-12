
import {mkdir, writeFile} from 'fs/promises';
import * as Inquirer from '@inquirer/prompts';
import { Logger } from '../utils/logger.js';

type PackageInitOptions = {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
    src?: string;
    main?: string;
};

export class Package {
  async init(options: PackageInitOptions = {}) {
    const name = options?.name ?? await Inquirer.input({ message: 'dPackage name:', default: '@drpm/my-dpk' });
    const version = options?.version ?? await Inquirer.input({ message: 'Version:', default: '0.1.0' });
    const description = options?.description ?? await Inquirer.input({ message: 'Description:', default: 'My Decentralized Package' });
    const author = options?.author ?? await Inquirer.input({ message: 'Author:' });
    const license = options?.license ?? await Inquirer.input({ message: 'License:', default: 'Apache-2.0' });
    const src = options?.src ?? await Inquirer.input({ message: 'Use src/ directory [y/N]:', default: 'y' });
    const main = options?.main ?? await Inquirer.input({ message: 'Main:', default: 'src/index.js' });

    const packageContent = {
      version,
      description,
      main,
      author,
      license,
      name         : name.startsWith('@drpm/') ? name : `@drpm/${name}`,
      type         : 'module',
      dependencies : {},
      scripts      : {
        start : 'node dist/index.js'
      }
    };

    if(src === 'y') {
      await mkdir('src');
      await writeFile('src/index.js', '');
    }

    // Write package.json to disk
    await writeFile('package.json', JSON.stringify(packageContent, null, 2));
    Logger.log('Generated package.json');

    // Create a custom .npmrc file with settings

    await writeFile('.npmrc', `//localhost:2092/:_authToken="dummy-token"
    @drpm:registry=http://localhost:2092
    `);
    Logger.log('Generated .npmrc with custom settings');
    await writeFile('tsconfig.json', JSON.stringify({
      compilerOptions : {
        target            : 'ES2022',
        module            : 'NodeNext',
        moduleResolution  : 'NodeNext',
        allowJs           : false,
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
      include   : ['src'],
      exclude : ['node_modules']
    }, null, 2));
  }

  publish(options: any) {
    throw new Error('Method not implemented: ' + options);
  }

  run(options: any) {
    throw new Error('Method not implemented: ' + options);
  }
}