import { Web5 } from '@web5/api';
import drpm from '../utils/drpm/drpm-protocol.js';
import { DpmProfile } from './profile.js';

export async function web5Connect(){
  const {password, dwnEndpoint} = await DpmProfile.loadProfile();
  return await Web5.connect({
    password,
    didCreateOptions : { dwnEndpoints: dwnEndpoint },
    techPreview      : { dwnEndpoints: dwnEndpoint },
    sync             : 'off'
  });
}

export class DpmProtocol {
  static async configure() {
    const { web5, did } = await web5Connect();
    const { status, protocol = null } = await web5.dwn.protocols.configure({message: { definition: drpm }});
    console.log('protocols.configure => status', status);
    console.log('protocols.configure => protocol', protocol);

    if (!protocol) {
      console.error('protocols.configure => protocol is null => status', status);
      throw new Error('Failed to configure protocol');
    }
    const { status: send } = await protocol.send(did);
    console.log('protocol.send => status', send);
  }

  static async query() {
    const { web5 } = await web5Connect();
    const { status, protocols = [] } = await web5.dwn.protocols.query({
      message : { filter: { protocol: drpm.protocol } }
    });
    console.log('protocols.query => status', status);

    if (!protocols.length) {
      console.error('protocols.query => no protocols => status', status);
      throw new Error('Failed to query protocols');
    }
    await Promise.all(protocols.map(async protocol => {
      const json = protocol.toJSON();
      console.log('protocols.configure => protocol', json);
      console.log('protocols.configure => protocol.descriptor', json.descriptor);
    }));
  }
}