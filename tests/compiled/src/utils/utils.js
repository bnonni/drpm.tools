import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { access, mkdir, readFile } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { extract } from 'tar';
import { Logger } from './logger.js';
import { join } from 'path';
const execDir = process.cwd();
const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;
async function determinePossibleEntryPoints() {
    const packageJsonPath = join(execDir, 'package.json');
    let isESModule = false;
    Logger.log('determinePossibleEntryPoints => packageJsonPath', packageJsonPath);
    try {
        // Read package.json to check the "type" field
        const packageJsonContent = await readFile(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        isESModule = packageJson.type === 'module';
        Logger.log('determinePossibleEntryPoints => isESModule', isESModule);
    }
    catch {
        throw new Error(`Failed to read package.json at ${packageJsonPath}`);
    }
    return isESModule
        ? [
            'index.mjs',
            'dist/esm/index.js',
            'dist/index.js',
        ] : [
        'index.js',
        'index.cjs',
        'dist/cjs/index.js',
        'dist/index.js',
    ];
}
export async function findEntryPoint(modulePath) {
    const possibleEntryPoints = await determinePossibleEntryPoints();
    Logger.log('findEntryPoint => possibleEntryPoints', possibleEntryPoints);
    // Iterate over possible entry points to find an existing one
    for (const entryPoint of possibleEntryPoints) {
        const fullPath = join('node_modules', modulePath, entryPoint);
        Logger.log('findEntryPoint => fullPath', fullPath);
        try {
            await access(fullPath); // Check if the file exists
            Logger.log('Found entry point', fullPath);
            return entryPoint;
        }
        catch {
            Logger.log('Continue to the next potential entry point');
        }
    }
    throw new Error(`No suitable entry point found for module at ${modulePath}`);
}
// TODO: Refactor to be more dynamic and generic for handling all possible query filters
export function encodeURIQueryFilters(queryFilters) {
    const { name, version } = queryFilters;
    const encodedName = encodeURIComponent(`filter.tags.name=${name}`);
    const encodedVersion = encodeURIComponent(`filter.tags.version=${version}`);
    return `${encodedName}&${encodedVersion}`;
}
export async function getDwnEndpoints(did) {
    Logger.log('getDwnEndpoints => did', did);
    const { didDocument } = await DidResolver.resolve(did);
    Logger.log('getDwnEndpoints => didDocument', JSON.stringify(didDocument, null, 2));
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['https://dwn.dpm.softare'];
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    Logger.log('getDwnEndpoints => serviceEndpoints', serviceEndpoints);
    return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
}
export async function fetchResource(did, name, version) {
    Logger.log('fetchResource => did, name, version', did, name, version);
    const endpoints = await getDwnEndpoints(did);
    Logger.log('fetchResource => endpoints', endpoints);
    if (!endpoints?.length) {
        Logger.error('DWeb Node resolution error: no valid endpoints found');
        throw new Error('DWeb Node resolution failed: no valid endpoints found.');
    }
    for (const endpoint of endpoints) {
        Logger.log('fetchResource => endpoint', endpoint);
        // Query endpoint for record
        const queryUrl = `${endpoint}/${did}/query?filter.tags.name=${name}&filter.tags.version=${version}`;
        Logger.log('fetchResource => queryUrl', queryUrl);
        const query = await fetch(queryUrl);
        Logger.log('fetchResource => query', query);
        if (!query.ok) {
            Logger.error(`DWN endpoint error: ${query.status}`);
            continue;
        }
        const { status: qStatus, entries: qEntries } = await query.json();
        const queryEntry = qEntries.shift();
        Logger.log('fetchResource => qStatus', qStatus);
        Logger.log('fetchResource => qEntries', qEntries);
        Logger.log('fetchResource => queryEntry', queryEntry);
        if (!queryEntry) {
            Logger.error('DWeb Node request failed: no record entry returned from query');
            continue;
        }
        // Read record
        const recordId = queryEntry.recordId;
        Logger.log('fetchResource => recordId', recordId);
        const readUrl = `${endpoint}/${did}/read/records/${recordId}`;
        Logger.log('fetchResource => readUrl', readUrl);
        const read = await fetch(readUrl);
        Logger.log('fetchResource => read, typeof read', read, typeof read);
        if (!read.ok) {
            Logger.error(`DWN endpoint error: ${read.status}`);
            continue;
        }
        const dpkRead = read.body;
        if (!dpkRead) {
            Logger.error('DWeb Node request failed: no record data returned from read');
            continue;
        }
        Logger.log('fetchResource => dpkRead', dpkRead);
        const DMIpath = `${execDir}/node_modules/@${did}/${name}/${version}`;
        // const dpkWrite = createWriteStream(DMIpath, dpkRead);
        // Logger.log('fetchResource => dpkWrite', dpkWrite);
        Logger.log(`Writing DPK to DMI path ${DMIpath}`);
        await mkdir(DMIpath, { recursive: true });
        await pipeline(dpkRead, extract({ C: DMIpath, strip: 1 }));
        Logger.log(`Successfully extracted to ${DMIpath}`);
        // TODO: Add integrity check
        // TODO: Compute sha512 of package and compare to hash in lockfile
        return DMIpath;
    }
    Logger.error('DWeb Node request failed: no valid response from any endpoint.');
    throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}
// export async function writeNodeModule(did: string, name: string, version: string, dpackage: Blob) {
//   Logger.log('writeNodeModule => did, name, version, dpackage', did, name, version, dpackage);
//   const arrayBuffer = await dpackage.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   const decompressedBuffer = gunzipSync(buffer);
//   Logger.log('records => record unzipped', decompressedBuffer);
//   const dpmDir = `${execDir}/node_modules/${did}/${name}/${version}`;
//   await mkdir(dpmDir, { recursive: true });
//   const readStream = await createReadStream(Buffer.from(decompressedBuffer));
//   return new Promise((resolve, reject) => {
//     readStream
//       .pipe(extract({ cwd: dpmDir, strip: 1 }))
//       .on('finish', resolve)
//       .on('error', reject);
//   });
// }
//# sourceMappingURL=utils.js.map