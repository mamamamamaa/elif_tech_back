import { model, Schema } from 'mongoose';

const StoreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }],
  },
  { versionKey: false, timestamps: true },
);

StoreSchema.pre('deleteOne', async function (next) {
  await model('Product').deleteMany({ store: this.getQuery()._id });
  next();
});

export { StoreSchema };
