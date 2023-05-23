import { Schema } from 'mongoose';

export const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  },
  { versionKey: false, timestamps: true },
);
