import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_PROVIDER, STORE_PROVIDER } from '../../config/providers';
import { Model } from 'mongoose';
import { IStore } from './interfaces/store.interface';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class StoreService {
  constructor(
    @Inject(STORE_PROVIDER) private storeModel: Model<IStore>,
    @Inject(PRODUCT_PROVIDER) private productModel: Model<IProduct>,
  ) {}

  async createNewStore(name: string): Promise<IStore> {
    const store: IStore = new this.storeModel({ name });
    return await store.save();
  }

  async removeStore(id: string) {
    return this.storeModel.deleteOne(
      { _id: id },
      {
        projection: '-createdAt -updatedAt',
      },
    );
  }

  async removeProduct(id: string) {
    return this.productModel.findByIdAndRemove(id, {
      projection: '-createdAt -updatedAt',
    });
  }

  async findStoreById(id: string): Promise<IStore> {
    const res = await this.storeModel.findById(id, '-createdAt -updatedAt');

    if (!res) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }

  async findAll(): Promise<IStore[]> {
    return this.storeModel.find({}, '-createdAt -updatedAt').exec();
  }

  async createNewProduct(
    store: IStore,
    createProductDto: CreateProductDto,
  ): Promise<IProduct> {
    const product: IProduct = new this.productModel({
      ...createProductDto,
      store: store._id,
    });

    const savedProduct: IProduct = await product.save();

    store.products.push(savedProduct._id);

    await store.save();

    return savedProduct;
  }
}
