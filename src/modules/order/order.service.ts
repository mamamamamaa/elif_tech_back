import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  checkProductsStoreId({ storeId, products }: CreateOrderDto) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].storeId !== storeId) {
        return false;
      }
    }

    return true;
  }
}
