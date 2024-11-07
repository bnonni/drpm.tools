import { generateMnemonic } from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { ProfileData, ProfileJson } from './types.js';
import { Logger } from './logger.js';

export const stringifier = (data: any): string => JSON.stringify(data, null, 2);

export const hideSensitive = (data: any): {} => ({...data, password: '***************', recoveryPhrase: '***************'});

export const secureContext = (profile: Partial<ProfileData>): {} => stringifier(hideSensitive(profile));

export const secureProfileJson = (profile: ProfileJson): {} => Object.fromEntries(
  Object.entries(profile).map(([method, data]) => [
    method,
    hideSensitive(data)
  ])
);

export const createPassword = (n: number = 6): string => {
  const mnemonic = generateMnemonic(english, 128).split(' ');
  const password: string[] = [];
  while (password.length < n && mnemonic.length > 0) {
    const randomIndex = Math.floor(Math.random() * mnemonic.length);
    password.push(mnemonic[randomIndex]);
    mnemonic.splice(randomIndex, 1);
  }
  return password.join(' ');
};

export const cleanEndpoint = (endpoint: string): string => {
  try {
    const parsedEndpoint = new URL(endpoint);
    return parsedEndpoint.host;
  } catch (error) {
    Logger.error('Invalid Endpoint:', error);
    return endpoint;
  }
};