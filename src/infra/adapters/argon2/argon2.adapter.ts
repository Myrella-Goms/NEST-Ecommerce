import * as argon2 from 'argon2';
import { Argon2Port } from '../../../modules/users/interfaces/argon2.port';

export class Argon2Adapter implements Argon2Port {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verify(passedPassword: string, persistedPassword: string): Promise<boolean> {
    return await argon2.verify(passedPassword, persistedPassword);
  }
}
