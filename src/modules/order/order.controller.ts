import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateOrderDto, GetUserOrderDto } from './dto/order.dto';
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

    if (!areStoreIdsEqual) {
      throw new HttpException(
        'One order can only be processed from one store',
        HttpStatus.CONFLICT,
      );
    }

    await this.storeService.changeQuantity(orderDto.products);

    return await this.orderService.createOrder(orderDto);
  }

  @Post('get')
  async getUserOrder(@Body() dto: GetUserOrderDto) {
    return await this.orderService.getUserOrder(dto);
  }
}
