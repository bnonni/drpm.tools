/* eslint-disable no-undef */
import chalk from 'chalk';
var Env;
(function (Env) {
    Env["Development"] = "development";
    Env["Production"] = "production";
    Env["Test"] = "test";
})(Env || (Env = {}));
const NODE_ENV = process.env.NODE_ENV || Env.Development;
const DEFAULT_LEVELS = ['error', 'security', 'warn'];
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
export class Logger {
    static levels = ['test', 'development'].includes(NODE_ENV)
        ? ['debug', ...DEFAULT_LEVELS]
        : DEFAULT_LEVELS;
    static debug(message, ...args) {
        console.debug(chalk.green('debug') + ':', message, ...args);
    }
    static error(message, ...args) {
        console.error(chalk.red('error') + ':', message, ...args);
    }
    static info(message, ...args) {
        console.info(chalk.blue('info') + ':', message, ...args);
    }
    static warn(message, ...args) {
        console.warn(chalk.yellow('warn') + ':', message, ...args);
    }
    static security(message, ...args) {
        console.warn(chalk.red('security') + ':', message, ...args);
    }
    static log(message, ...args) {
        switch (NODE_ENV) {
            case 'test':
            case 'development':
                Logger.debug(message, ...args);
                break;
            default:
                console.log(chalk.gray('log') + ':', message, ...args);
        }
    }
}
//# sourceMappingURL=logger.js.map