#!/usr/bin/env node
import { execSync } from 'child_process';
import { program } from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fetchDPK, Logger } from '../index.js';
const packageJsonPath = join(process.cwd(), 'package.json');
const packageLockJsonPath = join(process.cwd(), 'package-lock.json');

function runNpmCommand(command: string, args: string = '') {
  try {
    const npmCommand = `npm ${command} ${args}`;
    Logger.debug(`Running ${npmCommand}`);
    execSync(npmCommand, { stdio: 'inherit' });
  } catch (error) {
    Logger.error(`Failed to run npm ${command}:`, error);
  }
}

async function dpmInstall(packages: string[], args: string[]) {
  Logger.info(`Installing packages ${packages.join(', ')}`);

  const dpks: string[] = [];
  const npks: string[] = [];
  packages.filter(pkg => pkg.match(/did:(dht|web):.*/gi) ? dpks.push(pkg) : npks.push(pkg));

  if(dpks.length > 0) {
    Logger.info(`Installing DPKs ${dpks.join(', ')}`);
    await Promise.all(
      dpks.map(async (dpk) => {
        Logger.debug(`Processing DPK ${dpk}`);

        const [did, nameVersion] = dpk.split('/');
        const [name, version = 'latest'] = nameVersion.split('@');
        Logger.debug(`DPK did=${did} name=${name} version: ${version}`);

        if (!(did && name && version)) {
          throw new Error('DPK processing failed: invalid DPK format' + dpk);
        }

        try {
          Logger.info(`Fetching DPK ${dpk} ...`);
          const { drl, dmi, dph } = await fetchDPK(did.replace('@did', ''), name, version);
          Logger.debug('dpmInstall => drl, dmi, dph', drl, dmi, dph);

          const dpkPackageJson = JSON.parse(await readFile(`${dmi}/package.json`, 'utf8'));
          Logger.debug('dpmInstall => dpkPackageJson', dpkPackageJson);

          const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
          packageJson.dependencies[name] = version;
          Logger.debug('dpmInstall => packageJson', packageJson);

          const packageLockJson = JSON.parse(await readFile(packageLockJsonPath, 'utf8'));
          packageLockJson.packages[dmi] = {
            version,
            resolved     : drl,
            integrity    : dph,
            dependencies : dpkPackageJson.dependencies,
            license      : dpkPackageJson?.license,
            engines      : dpkPackageJson?.engines
          };
          Logger.debug('dpmInstall => packageLockJson', packageLockJson);

          await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
          await writeFile(packageLockJsonPath, JSON.stringify(packageLockJson, null, 2));
          Logger.info('Updated package.json and package-lock.json with DPK dependencies');
        } catch (error) {
          Logger.error(`Failed to fetch DPK ${dpk}`);
          throw error;
        }
      })
    );
  }

  if(npks.length > 0) {
    Logger.info(`Installing NPKs ... ${npks.join(' ')}`);
    npks.forEach(npk => {
      try {
        Logger.info(`Processing NPK ${npk} ...`);
        runNpmCommand('install', `${npk} ${args}`);
      } catch (error) {
        Logger.error(`Failed to install NPK ${npk}:`, error);
      }
    });
  } else {
    runNpmCommand('install');
  }
}

// Install command
program
  .command('install [packages...]')
  .description('Install dpm and npm packages. You can pass any npm install flags.')
  .allowUnknownOption() // Allows passing unknown options like --save, --save-dev, etc.
  .action((args) => {
    Logger.log('args', args);
    const packages: string[] = [];
    const flags: string[] = [];
    args.filter((arg: string) => (arg.startsWith('-') || arg.startsWith('--'))
      ? flags.push(arg)
      : packages.push(arg));
    dpmInstall(packages, flags);
  });

// Custom logic for uninstalling dpackages
function dpmUninstall(packages: string[]) {
  Logger.log(`Uninstalling dpackages: ${packages.join(', ')}`);

  // Placeholder for custom uninstall logic
  packages.forEach(pkg => {
    Logger.log(`Processing dpackage: ${pkg}`);
    // Custom logic for removing the dpackage
    // ...
  });

  // After all custom uninstall logic, run top-level npm uninstall
  Logger.log('Running npm uninstall at the top level...');
  runNpmCommand('uninstall', packages.join(' '));
}

// Uninstall command
program
  .command('uninstall [packages...npm flags]')
  .description('Uninstall dpm and npm packages. You can pass any npm uninstall flags.')
  .allowUnknownOption()
  .action((packages, options, command) => {
    const extraArgs = command.parent.args.slice(1).join(' ');
    if (options.npm) {
      // Pass all flags and packages to npm uninstall
      runNpmCommand('uninstall', `${packages.join(' ')} ${extraArgs}`);
    } else {
      // Execute custom uninstall logic
      dpmUninstall(packages);
    }
  });

// Custom logic for publishing dpackages
function dpmPublish() {
  Logger.log('Executing custom publish logic...');
  // Placeholder for custom publish logic
  // ...
}

// Publish command
program
  .command('publish')
  .description('Publish the dpackage')
  .allowUnknownOption() // Allows passing unknown options
  .option('-n, --npm', 'Run npm publish instead of custom logic')
  .option('-b, --both', 'Run custom logic and then npm publish')
  .action((options, command) => {
    const extraArgs = command.parent.args.slice(1).join(' ');

    if (options.npm) {
      // Run npm publish with flags
      runNpmCommand('publish', extraArgs);
    } else if (options.both) {
      // Run custom logic and then npm publish
      dpmPublish();
      runNpmCommand('publish', extraArgs);
    } else {
      // Execute only custom publish logic
      dpmPublish();
    }
  });

program.parse();
