import cuid from '@bugsnag/cuid';
import { DidJwk } from '@web5/dids';
import { exists } from 'fs-extra';
import { DEFAULT_RECOVERY_PHRASE, DRPM_HOME } from '../../config.js';
import { DidWebAgent } from '../../utils/did/did-web-facade.js';
import { createPassword } from '../../utils/misc.js';
import { DidWebCreateParams, DrpmProfile } from '../../utils/types.js';
import { DWeb5 } from '../dweb5.js';

export class WebProfile {
  // Helper function to create a new Web profile
  static async create({ dwnEndpoints, password, recoveryPhrase, web5DataPath, did }: DidWebCreateParams): Promise<Partial<DrpmProfile>> {
    const endpoints = dwnEndpoints.split(',');
    const [_d, _m, domain] = did?.split(':') ?? [];
    const basePath = `${DRPM_HOME}/DATA/WEB/AGENT/${domain}`;
    const dataPath = await exists(basePath)
      ? `${basePath}/${cuid()}`
      : basePath;

    const data = {
      did            : did ?? '',
      dwnEndpoints   : endpoints,
      password       : password ?? createPassword(),
      portableDid    : await DidJwk.create(),
      recoveryPhrase : recoveryPhrase ?? DEFAULT_RECOVERY_PHRASE,
      web5DataPath   : web5DataPath ?? dataPath,
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