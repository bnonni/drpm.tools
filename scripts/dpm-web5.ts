import { Protocol, Web5 } from '@web5/api';
import dpm from '../src/protocol.js';

async function configureProtocol(web5: Web5) {
  return await web5.dwn.protocols.configure({
    message : { definition: dpm }
  });

}

async function sendProtocol(protocol: Protocol, did: string) {
  if (!protocol || Object.entries(protocol).length === 0) {
    console.error('sendProtocol => protocol', protocol);
    throw new Error('Failed to configure protocol');
  }
  return await protocol.send(did);
}

const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];

const { web5, did, recoveryPhrase } = await Web5.connect({
  password,
  sync             : '30s',
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
});
console.log('web5Connect => did', did);
console.log('web5Connect => recoveryPhrase', recoveryPhrase);

const { status: configureStatus, protocol = {} as Protocol } = await configureProtocol(web5);
console.log('configureProtocol => Configured => status', configureStatus);
console.log('configureProtocol => Configured => protocol', protocol);

const { status: sendStatus } = await sendProtocol(protocol!, did);
console.log('configureProtocol => Sent DPM protocol', sendStatus);
