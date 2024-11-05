
import { Command } from 'commander';

export class PublishCommand {
  constructor(program: Command) {
    const publish = program
      .command('publish')
      .description('Publishes a DPK to your DWN');

    this.addInstallCommand(publish);
    this.addPublishCommand(publish);
  }

  private addInstallCommand(publish: Command) {
    publish
      .command('install')
      .description('Install a DPK from your DWN')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }

  private addPublishCommand(publish: Command) {
    publish
      .command('publish')
      .description('Publish a DPK to your DWN')
      .action(async () => {
        console.error('Not implemented yet');
      });
  }
}
