import { Mongoose } from 'mongoose';
import { DB_PROVIDER, PRODUCT_PROVIDER } from '../../../config/providers';
import { ProductSchema } from '../schemas/product.schema';

export const storeProvider = [
  {
    provide: PRODUCT_PROVIDER,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Product', ProductSchema),
    inject: [DB_PROVIDER],
  },
];
