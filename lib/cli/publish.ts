import { Web5 } from '@web5/api';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import dpm from '../../src/protocol.js';
import { Logger } from '../../src/utils/logger.js';

const sync = '30s';
const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
const connectOpts = {
  sync,
  password,
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
};
Logger.log('connectOpts', connectOpts);
const { web5, did } = await Web5.connect(connectOpts);
Logger.debug('did', did);

const name = 'tool5';
const version = '5.0.0';
const filePath = '/Users/bryan/Projects/TBD/bnonni/tool5/tool5-5.0.0.tgz';
Logger.log('filePath', filePath);

const { status: configure, protocol } = await web5.dwn.protocols.configure({ message: { definition: dpm }});
Logger.log('configure', configure);

if (!protocol) {
  throw new Error('Failed to configure protocol');
}

const { status: sendProto } = await protocol.send(did);
Logger.log('sendProto', sendProto);

const tgzFile = await readFile(filePath);
Logger.log('tgzFile', tgzFile);

const hash = createHash('sha512');
Logger.log('hash', hash);

hash.update(tgzFile);
Logger.log('hash.update', hash);

const base64Hash = hash.digest('base64');
Logger.log('base64Hash', base64Hash);

const integrity = `sha512-${base64Hash}`;
Logger.log('integrity', integrity);

const { record, status: create } = await web5.dwn.records.create({
  store   : true,
  data    : { package: tgzFile },
  message : {
    dataFormat   : 'application/json',
    schema       : dpm.types.release.schema,
    protocolPath : 'release',
    protocol     : dpm.protocol,
    tags         : {
      name,
      version,
      integrity,
    },
  },
});

Logger.log('create', create);
Logger.log('record', record);

if(!record) {
  throw new Error('Failed to create record');
}

// const { status: sendRecord } = await record.send(did);
// Logger.log('sendRecord', sendRecord);

// const { status: stat, records: recs = [] } = await web5.dwn.records.query({
//   from    : did,
//   message : {
//     filter : {
//       dataFormat   : 'application/json',
//       schema       : dpm.types.release.schema,
//       protocolPath : 'release',
//       protocol     : dpm.protocol,
//       tags         : {
//         name    : 'tool5',
//         version : '1.0.2',
//       },
//     },
//   },
// });
// Logger.log('query => status', stat);
// Logger.log('query => records', recs);
// if (!recs.length) {
//   throw new Error('Failed to query record');
// }
// const reads = await Promise.all(recs.map(async (rec) => {
//   return await rec.data.json();
// }));
// Logger.log('query => records => reads', reads);