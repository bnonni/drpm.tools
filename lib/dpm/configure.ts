import { Protocol, Web5 } from '@web5/api';
import dpm from '../../src/protocol.js';

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

const { status: configureStatus, protocol = {} as Protocol } = await web5.dwn.protocols.configure({
  message : { definition: dpm }
});
console.log('configureProtocol => Configured => status', configureStatus);
console.log('configureProtocol => Configured => protocol', protocol);


if (!protocol || Object.entries(protocol).length === 0) {
  console.error('sendProtocol => protocol', protocol);
  throw new Error('Failed to configure protocol');
}
const { status: sendStatus } = await protocol.send(did);

console.log('configureProtocol => Sent DPM protocol', sendStatus);
