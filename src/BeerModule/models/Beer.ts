import { model, Schema, Document } from 'mongoose';
import { IBeer } from '@src/BeerModule/entities/IBeer';

const beerSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  first_brewed: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  ingredients: {
    malt: [
      {
        name: {
          type: String,
        },
        amount: {
          value: { type: Number },
          unit: { type: String },
        },
      },
    ],
    hops: [
      {
        name: {
          type: String,
        },
        amount: {
          value: { type: Number },
          unit: { type: String },
        },
      },
    ],
    yeast: {
      type: String,
    },
  },
});

export const beerModel = model<IBeer & Document>('Beer', beerSchema);
