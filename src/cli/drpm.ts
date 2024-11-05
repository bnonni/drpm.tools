#!/usr/bin/env node

import { program } from 'commander';
import { ProfileCommand } from './commands/profile.js';
import { ProtocolCommand } from './commands/protocol.js';
import { RegistryCommand } from './commands/registry.js';

export default class InvokeDRPM {
  constructor() {
    this.setupVersion();
    this.loadCommands();
  }

  private setupVersion() {
    const packageJson = require('../../package.json');
    const version = packageJson?.version || 'latest';
    program.version(`drpm ${version}\nDecentralized Registry Package Manager CLI`);
  }

  private loadCommands() {
    new ProfileCommand(program);
    new ProtocolCommand(program);
    new RegistryCommand(program);
  }

  public execute() {
    program.parse(process.argv);
  }
}

new DRPM_CLI().execute();
