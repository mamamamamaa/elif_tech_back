import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { StoreService } from '../store/store.service';

@Controller('order')
export class OrderController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto) {
    const { products } = orderDto;

    console.log(products);

    return { message: 'Order created successfully' };
  }
}
