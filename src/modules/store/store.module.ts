import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { DatabaseModule } from '../database/database.module';
import { storeProvider } from './providers/store.providers';
import { productProvider } from './providers/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, ...storeProvider, ...productProvider],
})
export class StoreModule {}
