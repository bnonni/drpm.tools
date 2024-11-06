export class DRegistryPackageManagerError {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'ProfileCommand') {
    this.name = 'ProfileError';
    this.type = type;
    this.message = message;
  }
}