import { Schema } from 'mongoose';

export const StoreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { versionKey: false, timestamps: true },
);
