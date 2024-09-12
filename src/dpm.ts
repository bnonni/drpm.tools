type ResolveContext = {
  conditions: string[];
  importAttributes: {};
  parentURL: string;
};
type Function = (...args: any[]) => any;
type Resolution = { url: string; shortCircuit?: boolean };

export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function
): Promise<Resolution> {
  if (specifier.startsWith('did:dht:')) {
    return { url: DMItoDRL(specifier.split('/')), shortCircuit: true };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

function DMItoDRL(pathParts: string[]) {
  return `http://dweb/${pathParts?.[0]}/protocols/dpm/package/${pathParts?.[1]}/${pathParts?.[2]}`;
}

export function load(url: string, context: any, defaultLoad: Function) {
  if (url.startsWith('http://dweb/did:dht:')) {
    console.log('load dmi');
    return {
      source       : 'console.log("Hello, DMI!")',
      contentType  : 'application/javascript',
      shortCircuit : true
    };
  }
  return defaultLoad(url, context, defaultLoad);
}