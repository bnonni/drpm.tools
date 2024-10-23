export class DrlUtils {
  static isJsonObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  static base64urlEncode(data: any) {
    return Buffer.from(data).toString('base64url');
  }
}