import { Profile } from './profile/index.js';
import { Protocol } from './protocol/index.js';

export default class DecentralizedRegistryPackageManager {
  static profile: Profile = new Profile();
  static protocol: Protocol = new Protocol();
}