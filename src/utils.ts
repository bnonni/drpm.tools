import { UniversalResolver, DidDht, DidWeb } from '@web5/dids';
import { writeFile } from 'fs/promises';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });

export async function getDwnEndpoints(did: string) {
  try {
    console.log('getDwnEndpoints did', did);

    const { didDocument } = await DidResolver.resolve(did);
    console.log('getDwnEndpoints didDocument', didDocument);

    let endpoints = didDocument?.service?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint;
    console.log('getDwnEndpoints endpoints', endpoints);

    return (Array.isArray(endpoints) ? endpoints : [endpoints]).filter(url => url.startsWith('https'));
  } catch (error) {
    console.log('getDwnEndpoints error', error);
    throw new Error('DWeb Node endpoints resolution failed: ' + error);
  }
}

export async function fetchResource(did: string, drl: string, dmi: string): Promise<Response> {
  console.log('fetchResource did, drl, dmi', did, drl, dmi);

  const endpoints = await getDwnEndpoints(did);
  console.log('fetchResource endpoints', endpoints);

  if (!endpoints?.length) {
    console.error('DWeb Node resolution failed: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }

  for (const endpoint of endpoints) {
    console.log('fetchResource for endpoint', endpoint);
    try {
      const url = drl.replace('https://dweb/', endpoint);
      console.log('fetchResource url', url);
      const response = await fetch(url);
      console.log('fetchResource response', response);
      if (!response.ok) {
        console.log(`DWN endpoint error: ${response.status}`);
        continue;
      }
      return await writeNodeModule(dmi, response);
    } catch (error) {
      console.log(`DWN endpoint error: ${error}`);
      throw new Error('DWeb Node request failed: ' + error);
    }
  }

  console.error('DWeb Node request failed: no valid response from any endpoint.');
  throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}

export async function writeNodeModule(dmiPath: string, response: Response){
  const data = await response.json();
  await writeFile(`${process.cwd()}/node_modules/dpm/${dmiPath}`, data);
  return data;
}