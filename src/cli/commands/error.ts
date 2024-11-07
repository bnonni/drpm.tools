export class DrpmCli {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'CommandError') {
    this.name = 'DrpmCli';
    this.type = type;
    this.message = message;
  }
}