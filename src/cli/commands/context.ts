import { ICommand } from '../drpm.js';

export class ContextCommand implements ICommand {
  public async execute(): Promise<void> {
    throw new Error('Not implemented yet');
  }
}