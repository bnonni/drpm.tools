import { generateMnemonic } from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { ProfileData } from './types.js';

export const stringify = (data: any): string => JSON.stringify(data, null, 2);

export const hideSensitive = (data: any): {} => ({...data, password: '***************', recovertyPhrase: '***************'});

export const cleanProfile = (profile: Partial<ProfileData>): {} => stringify(hideSensitive(profile));

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