
import { Command } from 'commander';

export class RegistryCommand {
  constructor(program: Command) {
    const registry = program
      .command('registry')
      .description('Interact with the DRPM registry');

    this.addStartCommand(registry);
  }

  private addStartCommand(registry: Command) {
    registry
      .command('start')
      .description('Start the DRPM registry')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }
}
