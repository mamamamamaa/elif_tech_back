import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, GetUserOrderDtp } from './dto/order.dto';
import { ORDER_PROVIDER } from '../../config/providers';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_PROVIDER) private orderModel: Model<IOrder>) {}

  checkProductsStoreId({ storeId, products }: CreateOrderDto) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].storeId !== storeId) {
        return false;
      }
    }

    return true;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  async getUserOrder(getUserOrderDtp: GetUserOrderDtp) {
    return this.orderModel.find(getUserOrderDtp, '-createdAt -updatedAt');
  }
}
