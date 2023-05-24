import { Schema } from 'mongoose';

export const OrderSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    address: { type: String, required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        takenQuantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
