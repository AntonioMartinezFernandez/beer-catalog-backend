export interface IBcrypt {
  encrypt(password: string): Promise<string>;
  match(password: string, encryptedPassword: string): Promise<boolean>;
}
