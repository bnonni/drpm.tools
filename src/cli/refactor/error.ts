export class DRegistryPackageManagerError {
  name: string;
  type: string;
  message: string;

  constructor(message: string, type: string = 'DRegistryPackageManagerError') {
    this.name = 'DRegistryPackageManagerError';
    this.type = type;
    this.message = message;
  }
}