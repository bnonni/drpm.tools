import { DrlBuilder } from '../src/utils/dwn/drl-builder.js';

const did = 'did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo';
const name = 'tool5';
const version = '6.1.0';
const endpoint = 'http://localhost:3000';

const packageDRL = DrlBuilder
  .create({ endpoint, did })
  .buildDrlRead({
    protocolPath : 'package',
    filters      : {
      tags : [{ subKey: 'name', value: name }]
    }
  });
console.log('packageDRL', packageDRL);

const releaseDRL = DrlBuilder
  .create({ endpoint, did })
  .buildDrlRead({
    protocolPath : 'package/release',
    filters      : {
      tags    : [
        { subKey: 'name', value: name },
        { subKey: 'version', value: version }
      ],
    }
  });
console.log('releaseDRL', releaseDRL);

const drlQuery1 = DrlBuilder
  .create({ did, endpoint })
  .buildDrlQuery({ filters: { protocolPath: 'package' }});

console.log('drlQuery1', drlQuery1);

const drlQuery2 = DrlBuilder
  .create({ did, endpoint })
  .buildDrlQuery({
    filters : { tags: { subKey: 'name', value: name }}
  });
console.log('drlQuery2', drlQuery2);

const drlRead1 = DrlBuilder
  .create({ did, endpoint })
  .buildDrlRead({
    protocolPath : 'package/release',
    filters      : {
      tags : [
        { subKey: 'name', value: name },
        { subKey: 'version', value: version }
      ]
    }
  });

console.log('drlRead1', drlRead1);

const drlRead2 = DrlBuilder
  .create({ did, endpoint })
  .buildDrlRead({
    protocolPath : 'package/release',
    filters      : {
      tags : { subKey: 'name', value: name },
    }
  });
console.log('drlRead2', drlRead2);


