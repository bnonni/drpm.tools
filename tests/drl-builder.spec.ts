import { DrlBuilder } from '../src/utils/drpm/drl-builder.js';

const path = process.argv.slice(2)?.[0];
const did = 'did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo';
const name = 'tool5';
const version = '6.1.0';
const builder = DrlBuilder.create({ endpoint: 'http://localhost:3000', did });
const drl = path === 'package'
  ? builder.buildPackageDrl({ name, version })
  : builder.buildPackageReleaseDrl({ name, version });

console.log(drl);


const createArgs = {
  did      : 'did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo',
  endpoint : 'http://localhost:3000'
};

const drlQuery1 = DrlBuilder
  .create(createArgs)
  .buildDrlQuery({ filters: { protocolPath: 'package' }});

console.log('drlQuery1', drlQuery1);


const drlQuery2 = DrlBuilder
  .create(createArgs)
  .buildDrlQuery({
    filters : { tags: { subKey: 'name', value: 'tool5' }}
  });
console.log('drlQuery2', drlQuery2);


const drlRead1 = DrlBuilder
  .create(createArgs)
  .buildDrlRead({
    protocolPath : 'package/release',
    filters      : {
      tags : [
        { subKey: 'name', value: 'tool5' },
        { subKey: 'version', value: '6.1.0' }
      ]
    }
  });

console.log('drlRead1', drlRead1);

const drlRead2 = DrlBuilder
  .create(createArgs)
  .buildDrlRead({
    protocolPath : 'package/release',
    filters      : {
      tags : { subKey: 'name', value: 'tool5' },
    }
  });
console.log('drlRead2', drlRead2);


