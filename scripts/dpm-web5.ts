import { Web5 } from '@web5/api';
import dpm from '../src/protocol.js';

const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];

export async function web5Connect() {
  return await Web5.connect({
    password,
    sync             : '30s',
    techPreview      : { dwnEndpoints },
    didCreateOptions : { dwnEndpoints }
  });
}

export async function dpmConfigureProtocol(web5: Web5, did: string) {
  const { status: configure, protocol } = await web5.dwn.protocols.configure({
    message : { definition: dpm }
  });
  console.log('Configured DPM protocol', configure);
  if (!protocol) {
    throw new Error('Failed to configure protocol');
  }
  return await protocol.send(did);
}

const { web5, did, recoveryPhrase } = await web5Connect();
console.log('web5Connect => did', did);
console.log('web5Connect => recoveryPhrase', recoveryPhrase);

const { status: configure } = await dpmConfigureProtocol(web5, did);
console.log('dpmConfigureProtocol => status', configure);
