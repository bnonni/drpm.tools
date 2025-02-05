import { DWeb5 } from '../../lib/dweb5.js';
import { Profile } from '../../lib/profile.js';
import { ICommand } from '../drpm.js';

export class ConnectCommand implements ICommand {
  async execute({ options }: { options: any; }): Promise<void> {
    const name = options.name ?? Profile.loadStaticSync().name;
    await DWeb5.connect({name, verbose: true});
  }
}