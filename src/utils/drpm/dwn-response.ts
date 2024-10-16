export type ResponseInfo = {
    ok: boolean;
    code: number;
    status: string;
    message?: string;
}

export type DwnResponseInfo = {
    code: number;
    status: string;
}

export class ResponseUtils {
  public static is2xx = (code: number) => code >= 200 && code <= 299;
  public static is3xx = (code: number) => code >= 300 && code <= 399;

  public static OK = (ok: boolean) => ok === true;
  public static notOK = (ok: boolean) => !this.OK(ok);

  public static codeSuccess = (statusCode: number) => this.is2xx(statusCode) || this.is3xx(statusCode);
  public static codeFail = (statusCode: number) => !this.codeSuccess(statusCode);

  public static statusOk = (status: string) => status === 'OK';
  public static statusNotOk = (status: string) => !this.statusOk(status);

  public static dwnSuccess = ({code, status}: DwnResponseInfo) =>
    this.codeSuccess(code) ||
    this.statusNotOk(status);

  public static dwnFail = (info: DwnResponseInfo) => !this.dwnSuccess(info);

  public static success = ({ok, code, status}: ResponseInfo) =>
    this.OK(ok) ||
    this.codeSuccess(code) ||
    this.statusOk(status);

  public static fail = (info: ResponseInfo) => !this.success(info);
}