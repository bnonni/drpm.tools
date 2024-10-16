import { Logger } from '../../src/utils/logger.js';
import { runNpmCommand } from './npm.js';
// Custom logic for uninstalling dpackages
export function dpmUninstall(packages) {
    const dpks = [];
    const npks = [];
    packages.filter(pkg => pkg.match(/did:(dht|web):.*/gi) ? dpks.push(pkg) : npks.push(pkg));
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
//# sourceMappingURL=uninstall.js.map