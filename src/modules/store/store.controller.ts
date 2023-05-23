import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { IsJSON } from 'class-validator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post()
  @IsJSON()
  createStore(@Body() dto: CreateStoreDto) {
    return 'Hello store';
  }
}
