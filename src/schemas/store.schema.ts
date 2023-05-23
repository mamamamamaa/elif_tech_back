import { Schema } from 'mongoose';

export const StoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});
