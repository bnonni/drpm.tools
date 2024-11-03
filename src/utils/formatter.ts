import chalk from 'chalk';

type FormatOptions = {
  underline?: boolean;
  bold?: boolean
}
type ColorizeFormatOptions = {
  message: string;
  color: string;
  options: FormatOptions;
};

export class Formatter {
  constructor() {}

  public colorizeFormat({ message, color, options = {} }: ColorizeFormatOptions): string {
    const colorized = this.colorize(message, color);
    const { underline, bold } = options;
    if(underline && bold) {
      return this.bold(this.underline(colorized));
    }
    if(underline) {
      return this.underline(colorized);
    }
    if(bold) {
      return this.bold(colorized);
    }
    return colorized;
  }

  public bold(message: string): string {
    return chalk.bold(message);
  }

  public underline(message: string): string {
    return chalk.underline(message);
  }

  public boldUnderline(message: string): string {
    return this.bold(this.underline(message));
  }

  public format(message: string, options: FormatOptions = {}): string {
    const { underline, bold } = options;
    if(underline && bold) {
      return this.underline(this.bold(message));
    }
    if(underline) {
      return this.underline(message);
    }
    if(bold) {
      return this.bold(message);
    }
    return message;
  }

  public colorize(message: string, color: string): string {
    switch(color) {
      case 'red':
        return this.red(message);
      case 'green':
        return this.green(message);
      case 'blue':
        return this.blue(message);
      case 'yellow':
        return this.yellow(message);
      case 'gray':
        return this.gray(message);
      default:
        return message;
    }
  }

  public red(message: string): string {
    return chalk.red(message);
  }
  public green(message: string): string {
    return chalk.green(message);
  }
  public blue(message: string): string {
    return chalk.blue(message);
  }
  public yellow(message: string): string {
    return chalk.yellow(message);
  }
  public gray(message: string): string {
    return chalk.gray(message);
  }
}

const fmtr = new Formatter();
export default fmtr;