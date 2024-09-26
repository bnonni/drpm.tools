type Level = 'debug' | 'error' | 'info' | 'log' | 'warn' | 'test';
/**
 *
 * A simple console logger with colorized output.
 *
 * @class Logger - A simple console logger with colorized output.
 *
 * @property {Env} env - The current environment.
 * @property {Level} level - The current log level.
 *
 */
export declare class Logger implements Partial<Console> {
    static levels: Level[];
    static debug(message?: unknown, ...args: unknown[]): void;
    static error(message?: unknown, ...args: unknown[]): void;
    static info(message?: unknown, ...args: unknown[]): void;
    static warn(message?: unknown, ...args: unknown[]): void;
    static security(message?: unknown, ...args: unknown[]): void;
    static log(message?: unknown, ...args: unknown[]): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map