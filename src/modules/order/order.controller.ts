import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { StoreService } from '../store/store.service';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly storeService: StoreService,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    const areStoreIdsEqual = this.orderService.checkProductsStoreId(orderDto);
    return { message: areStoreIdsEqual };
  }
}
