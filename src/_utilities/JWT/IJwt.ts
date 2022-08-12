export interface IJwt {
  encrypt(payload: Record<string, unknown>): string;
  decrypt(token: string): Record<string, unknown>;
}
