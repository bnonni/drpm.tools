import { DWeb5 } from '../../drpm/dweb5.js';
import { ICommand } from '../drpm.js';

export class ConnectCommand implements ICommand {
  async execute({ options }: { options: any; }): Promise<void> {
    await DWeb5.connect(options);
  }
}