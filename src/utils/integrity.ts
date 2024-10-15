import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

type IntegrityFormat = 'stream' | 'file';
type IntegrityData = ReadableStream<Uint8Array> | string;
type IntegrityParams = { format: IntegrityFormat; data: IntegrityData };

export class Integrity {

  public static async sha512Integrity({ format, data }: IntegrityParams): Promise<string> {
    return format === 'stream' || data instanceof ReadableStream
      ? await Integrity.sha512IntegrityStream(data as ReadableStream<Uint8Array>)
      : await Integrity.sha512IntegrityFile(data as string);
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