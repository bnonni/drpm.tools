#!/usr/bin/env node
import { program } from 'commander';
import { dpmInstall } from './install.js';
import { dpmUninstall } from './uninstall.js';
import { Logger } from '../../src/utils/logger.js';
// Install command
program
    .command('install [packages...]')
    .command('i [packages...]')
    .command('add [packages...]')
    .description('Install dpm and npm packages. You can pass any npm install flags.')
    .allowUnknownOption()
    .action(async (args) => {
    const packages = [];
    const flags = [];
    args.filter((arg) => (arg.startsWith('-') || arg.startsWith('--'))
        ? flags.push(arg)
        : packages.push(arg));
    await dpmInstall(packages, flags);
});
// Uninstall command
program
    .command('uninstall [packages...]')
    .command('u [packages...]')
    .command('remove [packages...]')
    .description('Uninstall dpm and npm packages. You can pass any npm uninstall flags.')
    .allowUnknownOption()
    .action((args) => {
    const packages = [];
    const flags = [];
    args.filter((arg) => (arg.startsWith('-') || arg.startsWith('--'))
        ? flags.push(arg)
        : packages.push(arg));
    dpmUninstall(packages, flags);
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
    .allowUnknownOption()
    .action((args) => {
    const packages = [];
    const flags = [];
    args.filter((arg) => (arg.startsWith('-') || arg.startsWith('--'))
        ? flags.push(arg)
        : packages.push(arg));
    dpmPublish();
});
program.parse();
//# sourceMappingURL=cli.js.map