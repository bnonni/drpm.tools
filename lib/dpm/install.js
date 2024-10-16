import { readFile, writeFile } from 'fs/promises';
import { fetchDPK } from '../utils/dpk.js';
import { Logger } from '../../src/utils/logger.js';
import { localPkgJsonPath, localPkgLockJsonPath, runNpmCommand } from './npm.js';
export async function installDPK(dpk) {
    Logger.debug(`Processing DPK ${dpk}`);
    const [did, nameVersion] = dpk.split('/');
    const [name, version = 'latest'] = nameVersion.split('@');
    if (!(did && name && version)) {
        throw new Error('DPK processing failed: invalid DPK format ' + dpk);
    }
    try {
        Logger.info(`Fetching DPK ${dpk} ...`);
        const { drl, dmi, dph } = await fetchDPK(did.replace('@did', ''), name, version);
        const localPkgJson = JSON.parse(await readFile(localPkgJsonPath, 'utf8'));
        const localPkgLockJson = JSON.parse(await readFile(localPkgLockJsonPath, 'utf8'));
        Logger.debug('installDPK => localPkgJsonPath', localPkgJsonPath);
        Logger.debug('installDPK => localPkgLockJsonPath', localPkgLockJsonPath);
        localPkgJson.dependencies[dpk] = version;
        Logger.debug('installDPK => localPkgJson.dependencies[dpk]', localPkgJson.dependencies[dpk]);
        const dpkPkgJsonPath = `${dmi}/package.json`;
        const dpkPackageJson = JSON.parse(await readFile(dpkPkgJsonPath, 'utf8'));
        Logger.debug('installDPK => update localPkgLockJson with DPK dep', localPkgJson.dependencies[dpk]);
        localPkgLockJson.packages[dmi] = {
            version,
            resolved: drl,
            integrity: dph,
            dependencies: dpkPackageJson.dependencies,
            license: dpkPackageJson?.license,
            engines: dpkPackageJson?.engines
        };
        await writeFile(localPkgJsonPath, JSON.stringify(localPkgJson, null, 2));
        await writeFile(localPkgLockJsonPath, JSON.stringify(localPkgLockJson, null, 2));
        Logger.info('Updated package.json and package-lock.json with DPK dependencies');
        Logger.info(`Recurisvely install DPK dependencies ...`);
        const dpkDependencies = Object.keys(dpkPackageJson.dependencies || {})
            .filter(dep => dep.match(/did:(dht|web):.*/gi));
        for (const dep of dpkDependencies) {
            await installDPK(dep);
        }
    }
    catch (error) {
        Logger.error(`Failed to fetch DPK ${dpk}`);
        throw error;
    }
}
export async function dpmInstall(packages, args) {
    Logger.info(`Installing packages ${packages.join(', ')}`);
    const dpks = [];
    const npks = [];
    packages.filter(pkg => pkg.match(/did:(dht|web):.*/gi) ? dpks.push(pkg) : npks.push(pkg));
    // Handle custom DPK installation
    if (dpks.length > 0) {
        Logger.info(`Installing DPKs ${dpks.join(', ')}`);
        await Promise.all(dpks.map(dpk => installDPK(dpk)));
    }
    // Check for DPKs in package.json dependencies for `dpm install`
    if (packages.length === 0) {
        const localPkgJson = JSON.parse(await readFile(localPkgJsonPath, 'utf8'));
        const dependencies = localPkgJson.dependencies || {};
        const devDependencies = localPkgJson.devDependencies || {};
        const allDeps = { ...dependencies, ...devDependencies };
        const dpkDeps = Object.keys(allDeps).filter(dep => dep.startsWith('dpk:'));
        for (const dpk of dpkDeps) {
            await installDPK(dpk.replace('dpk:', ''));
        }
    }
    // Install NPM packages (NPKs)
    if (npks.length > 0) {
        Logger.info(`Installing NPKs ... ${npks.join(' ')}`);
        npks.forEach(npk => {
            try {
                Logger.info(`Processing NPK ${npk} ...`);
                runNpmCommand('install', `${npk} ${args.join(' ')}`);
            }
            catch (error) {
                Logger.error(`Failed to install NPK ${npk}:`, error);
            }
        });
    }
    else {
        runNpmCommand('install');
    }
}
//# sourceMappingURL=install.js.map