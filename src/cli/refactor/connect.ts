
import { Command } from 'commander';

export class ConnectCommand {
  constructor(program: Command) {
    const connect = program
      .command('connect')
      .description('Connect with a DWN or other DRPM compatible service');

    this.addConnectCommand(connect);
  }

  private addConnectCommand(connect: Command) {
    connect
      .command('start')
      .description('Establish a connection')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }
}
