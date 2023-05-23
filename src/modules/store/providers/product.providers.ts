import { Mongoose } from 'mongoose';
import { DB_PROVIDER, STORE_PROVIDER } from '../../../config/providers';
import { StoreSchema } from '../../../schemas/store.schema';

export const productProvider = [
  {
    provide: STORE_PROVIDER,
    useFactory: (mongoose: Mongoose) => mongoose.model('Store', StoreSchema),
    inject: [DB_PROVIDER],
  },
];
