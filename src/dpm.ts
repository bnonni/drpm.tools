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
  return `file:///dweb/${pathParts?.[0]}/read/protocols/dpm/package?filter.tags.name="${pathParts?.[1]}"&filter.tags.version="${pathParts?.[2]}"`;
}

export function load(url: string, context: any, defaultLoad: Function) {
  console.log('function load ~~');
  console.log('url', url);
  console.log('context', context);
  console.log('defaultLoad', defaultLoad);

  return defaultLoad(url, context, defaultLoad);
}