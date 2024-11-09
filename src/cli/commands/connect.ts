import { DWeb5 } from '../../drpm/dweb5.js';
import { Profile } from '../../drpm/profile.js';
import { ICommand } from '../drpm.js';

export class ConnectCommand implements ICommand {
  async execute({ options }: { options: any; }): Promise<void> {
    const name = options.name ?? Profile.loadStatic().name;
    await DWeb5.connect({name, verbose: true});
  }
}