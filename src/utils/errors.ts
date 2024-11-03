export class ProfileError {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'ProfileCommand') {
    this.name = 'ProfileError';
    this.type = type;
    this.message = message;
  }
}

export class ProtocolError {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'ProtocolCommand') {
    this.name = 'ProtocolError';
    this.type = type;
    this.message = message;
  }
}

export class RegistryError {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'RegistryCommand') {
    this.name = 'RegistryError';
    this.type = type;
    this.message = message;
  }
}