import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, GetUserOrderDto } from './dto/order.dto';
import { ORDER_PROVIDER } from '../../config/providers';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_PROVIDER) private orderModel: Model<IOrder>) {}

  checkProductsStoreId({ store: id, products }: CreateOrderDto) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].store !== id) {
        return false;
      }
    }

    return true;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  async getUserOrder(getUserOrderDto: GetUserOrderDto) {
    return this.orderModel
      .find(getUserOrderDto, '-createdAt -updatedAt')
      .populate('products.product', '-createdAt -updatedAt')
      .populate('store', '-createdAt -updatedAt');
  }
}
