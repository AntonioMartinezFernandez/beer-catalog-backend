import { model, Schema, Document } from 'mongoose';
import { ISearch } from '@src/BeerModule/entities/ISearch';

const searchSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  search_term: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const searchModel = model<ISearch & Document>('Search', searchSchema);
