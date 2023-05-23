import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_PROVIDER, STORE_PROVIDER } from '../../config/providers';
import { Model } from 'mongoose';
import { IStore } from '../../interfaces/store.interface';
import { IProduct } from '../../interfaces/product.interface';
import { CreateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @Inject(STORE_PROVIDER) private storeModel: Model<IStore>,
    @Inject(PRODUCT_PROVIDER) private productModel: Model<IProduct>,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<IStore> {
    const store = await this.storeModel.create(createStoreDto);
    return store.save({ validateBeforeSave: true });
  }

  async findAll(): Promise<IStore[]> {
    return this.storeModel.find({}, '-createdAt -updatedAt').exec();
  }
}
