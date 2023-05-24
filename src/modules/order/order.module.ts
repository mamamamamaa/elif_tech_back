import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProvider } from './providers/order.providers';
import { DatabaseModule } from '../database/database.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [DatabaseModule, StoreModule],
  controllers: [OrderController],
  providers: [OrderService, ...orderProvider],
})
export class OrderModule {}
