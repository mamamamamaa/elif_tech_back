import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { CreateProductDto } from './dto/product.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAllStores() {
    return this.storeService.findAllStores();
  }

  @Get(':storeId/products')
  getStoreProducts(@Param('storeId') storeId: string) {
    return this.storeService.findStoreProducts(storeId);
  }

  @Post()
  async createStore(@Body() dto: CreateStoreDto) {
    const newStore = await this.storeService.createNewStore(dto);

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

  @Delete('product/:productId')
  async removeProduct(@Param('productId') productId: string) {
    return this.storeService.removeProduct(productId);
  }
}
