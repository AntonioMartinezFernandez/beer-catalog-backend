import { model, Schema, Document } from 'mongoose';
import { IUser } from '@src/UserModule/entities/IUser';

const userSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export const userModel = model<IUser & Document>('User', userSchema);
