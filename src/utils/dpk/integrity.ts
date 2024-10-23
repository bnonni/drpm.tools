import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { DIntegrityParams } from '../types.js';

export class DIntegrity {
  public static async sha512Integrity({ format, data }: DIntegrityParams): Promise<string> {
    return format === 'stream' || data instanceof ReadableStream
      ? await DIntegrity.sha512IntegrityStream(data as ReadableStream<Uint8Array>)
      : await DIntegrity.sha512IntegrityFile(data as string);
  }
  public static async sha512IntegrityStream(stream: ReadableStream<Uint8Array>): Promise<string> {
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