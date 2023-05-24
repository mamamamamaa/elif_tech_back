import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { CreateProductDto } from './dto/product.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Post('store')
  async createStore(@Body() dto: CreateStoreDto) {
    const { name } = dto;

    const newStore = await this.storeService.createNewStore(name);

    return { store: newStore };
  }

  @Get('store')
  getAllStores() {
    return this.storeService.findAll();
  }

  @Post(':storeId/products')
  async createNewProduct(
    @Param('storeId') storeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    const store = await this.storeService.findStoreById(storeId);

    const newProduct = await this.storeService.createNewProduct(
      store,
      createProductDto,
    );

    return { product: newProduct };
  }
}
