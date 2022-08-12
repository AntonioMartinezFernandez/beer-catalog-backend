export interface IUser {
  id: string;
  email: string;
  rol: 'user' | 'admin';
  password: string;
  created_at: Date;
}
