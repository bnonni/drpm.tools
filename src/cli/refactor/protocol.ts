
import { Command } from 'commander';

export class ProtocolCommand {
  constructor(program: Command) {
    const protocol = program
      .command('protocol')
      .description('Configure your DWN with the DRPM protocol');

    this.addConfigureCommand(protocol);
    this.addQueryCommand(protocol);
  }

  private addConfigureCommand(protocol: Command) {
    protocol
      .command('configure')
      .description('Configure your DWN with the DRPM protocol')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }

  private addQueryCommand(protocol: Command) {
    protocol
      .command('query')
      .description('Query the DWN with DRPM protocol')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }
}
