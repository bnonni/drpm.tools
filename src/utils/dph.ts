import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

// TODO: Figure out way to stream response into a integrity hash computation
export class DecentralizedPackageHash {
  public static async sha512Integrity(stream: ReadableStream<Uint8Array>): Promise<string> {
    const hash = createHash('sha512');
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      hash.update(value);
    }

    return `sha512-${hash.digest('base64')}`;
  }

  public static async sha512IntegrityFile(tgzFilepath: string): Promise<string> {
    return `sha512-${createHash('sha512').update(await readFile(tgzFilepath)).digest('base64')}`;
  }
}