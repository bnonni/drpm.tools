/* eslint-disable no-undef */
import chalk from 'chalk';

enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

type Level = 'debug' | 'error' | 'info' | 'log' | 'warn' | 'test';

const NODE_ENV = process.env.NODE_ENV as Env || Env.Development;
const DEFAULT_LEVELS = ['error', 'security', 'warn'] as Level[];

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
export class Logger implements Partial<Console> {
  public static levels: Level[] = ['test', 'development'].includes(NODE_ENV)
    ? ['debug', ...DEFAULT_LEVELS]
    :  DEFAULT_LEVELS;

  public static debug(message?: unknown, ...args: unknown[]): void {
    console.debug(chalk.green('debug') + ':', message, ...args);
  }

  public static error(message?: unknown, ...args: unknown[]): void {
    console.error(chalk.red('error') + ':', message, ...args);
  }

  public static info(message?: unknown, ...args: unknown[]): void {
    console.info(chalk.blue('info') + ':', message, ...args);
  }

  public static warn(message?: unknown, ...args: unknown[]): void {
    console.warn(chalk.yellow('warn') + ':', message, ...args);
  }

  public static security(message?: unknown, ...args: unknown[]): void {
    console.warn(chalk.red('security') + ':', message, ...args);
  }

  public static plain(message?: unknown, ...args: unknown[]): void {
    console.log(message, ...args);
  }

  public static newline(): void {
    console.log();
  }

  public static log(message?: unknown, ...args: unknown[]): void {
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