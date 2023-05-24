import { Mongoose } from 'mongoose';
import { DB_PROVIDER, ORDER_PROVIDER } from '../../../config/providers';
import { OrderSchema } from '../schemas/order.schema';

export const orderProvider = [
  {
    provide: ORDER_PROVIDER,
    useFactory: (mongoose: Mongoose) => mongoose.model('Order', OrderSchema),
    inject: [DB_PROVIDER],
  },
];
