export interface Argon2Port {
  hash(password: string): Promise<string>;
  verify(passedPassword: string, persistedPassword: string): Promise<boolean>;
}
