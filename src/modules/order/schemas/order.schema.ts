import { Schema } from 'mongoose';

export const OrderSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    storeId: { type: String, required: true },
    address: { type: String, required: true },
    products: {
      type: [
        {
          productId: String,
          quantity: Number,
        },
      ],
      required: true,
    },
    totalPrice: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);
