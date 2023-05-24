import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { CreateProductDto } from './dto/product.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAllStores() {
    return this.storeService.findAll();
  }

  @Post()
  async createStore(@Body() dto: CreateStoreDto) {
    const { name } = dto;

    const newStore = await this.storeService.createNewStore(name);

    return { store: newStore };
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

  @Delete(':storeId')
  async removeStore(@Param('storeId') storeId: string) {
    return this.storeService.removeStore(storeId);
  }
}
