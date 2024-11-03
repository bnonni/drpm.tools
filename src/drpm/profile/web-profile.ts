import { DidJwk } from '@web5/dids';
import { DEFAULT_RECOVERY_PHRASE, DEFAULT_WEB5DATAPATH } from '../../config.js';
import { DidWebAgent } from '../../utils/did/did-web-facade.js';
import { createPassword } from '../../utils/misc.js';
import { DidWebCreateParams, DrpmProfile } from '../../utils/types.js';
import { DWeb5 } from '../dweb5.js';

export class WebProfile {
  // Helper function to create a new Web profile
  static async create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did }: DidWebCreateParams): Promise<Partial<DrpmProfile>> {

    const data = {
      did            : did ?? '',
      dwnEndpoints   : [dwnEndpoints],
      password       : password ?? createPassword(),
      portableDid    : await DidJwk.create(),
      recoveryPhrase : recoveryPhrase ?? DEFAULT_RECOVERY_PHRASE,
      web5DataPath   : web5DataPath ?? `${DEFAULT_WEB5DATAPATH}/WEB/${did}/AGENT`,
    };

    const agent = await DidWebAgent.create({
      dataPath    : data.web5DataPath,
      portableDid : data.portableDid
    });

    if(await agent.firstLaunch()) {
      data.recoveryPhrase = await agent.initialize({ password: data.password });
    } else {
      throw new Error('Profile already exists. Use "drpm profile switch --web" to load this profile.');
    }
    await agent.start({ password: data.password });

    await DWeb5.connectWeb({ data, agent });
    return { current: 'web', web: data };
  }
}