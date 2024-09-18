import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import Npm from 'npm';
import * as tar from 'tar';
import { Logger } from './logger.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;
type QueryFilters = { name: string; version: string; [key: string]: string }

// TODO: Refactor to be more dynamic and generic for handling all possible query filters
export function encodeURIQueryFilters(queryFilters: QueryFilters) {
  const { name, version } = queryFilters;
  const encodedName = encodeURIComponent(`filter.tags.name=${name}`);
  const encodedVersion = encodeURIComponent(`filter.tags.version=${version}`);
  return `${encodedName}&${encodedVersion}`;
}

export async function getDwnEndpoints(did: string) {
  try {
    Logger.log('getDwnEndpoints did', did);
    const { didDocument } = await DidResolver.resolve(did);
    Logger.log('getDwnEndpoints didDocument', didDocument);
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['https://dwn.dpm.softare'];
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    Logger.log('getDwnEndpoints serviceEndpoints', serviceEndpoints);
    return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
  } catch (error) {
    console.error('getDwnEndpoints error', error);
    throw new Error('DWeb Node endpoints resolution failed: ' + error);
  }
}

export async function fetchResource(did: string, name: string, version: string): Promise<string> {
  Logger.log('fetchResource: did, name, version', did, name, version);
  const endpoints = await getDwnEndpoints(did);
  Logger.log('fetchResource endpoints', endpoints);

  if (!endpoints?.length) {
    console.error('DWeb Node resolution failed: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }

  for (const endpoint of endpoints) {
    Logger.log('fetchResource for endpoint', endpoint);
    try {
      const url = `${endpoint}/${did}/query?filter.tags.name=${name}&filter.tags.version=${version}`;
      Logger.log('fetchResource from:', url);
      const response = await fetch(url);
      Logger.log('fetchResource response', response);
      if (!response.ok) {
        Logger.log(`DWN endpoint error: ${response.status}`);
        continue;
      }
      const dpackage = await response.json();
      Logger.log('fetchResource dpackage', dpackage);
      // TODO: Add integrity check
      // TODO: Compute sha512 of package and compare to hash in lockfile
      Npm.commands.install([`${did}/${name}/${version}`], (error: any) => {
        if (error) {
          console.error('Installation failed:', error);
          throw new Error('DWeb Node package installation failed: ' + error);
        } else {
          Logger.log('Package installed successfully.');
        }
      });
      const drl = `${process.cwd()}/node_modules/${did}/${name}/${version}`;
      Logger.log('fetchResource: mkdir', drl);
      return drl;
    } catch (error) {
      Logger.log(`DWN endpoint error: ${error}`);
      throw new Error('DWeb Node request failed: ' + error);
    }
  }

  console.error('DWeb Node request failed: no valid response from any endpoint.');
  throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}

export function writeNodeModule(drl: string, data: any) {
  try {
    Logger.log('writeNodeModule: writing code to', drl);
    tar.extract({
      cwd   : drl, // Extract to the target directory
      strip : 1, // Remove the root folder from the tarball path
    }).end(data);
    Logger.log(`Successfully extracted to ${drl}`);
  } catch (error) {
    console.error('Error extracting the tarball:', error);
  }
}