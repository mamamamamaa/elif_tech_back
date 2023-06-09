import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRODUCT_PROVIDER, STORE_PROVIDER } from '../../config/providers';
import { Model } from 'mongoose';
import { IStore } from './interfaces/store.interface';
import { IProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';
import { CreateStoreDto } from './dto/store.dto';
import { OrderProduct } from '../order/interfaces/order.interface';

@Injectable()
export class StoreService {
  constructor(
    @Inject(STORE_PROVIDER) private storeModel: Model<IStore>,
    @Inject(PRODUCT_PROVIDER) private productModel: Model<IProduct>,
  ) {}

  async createNewStore(createStoreDto: CreateStoreDto): Promise<IStore> {
    const store: IStore = new this.storeModel(createStoreDto);
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

  async findAllStores(): Promise<IStore[]> {
    return this.storeModel.find({}, '-createdAt -updatedAt -products');
  }

  async findStoreProducts(storeId: string): Promise<IProduct[]> {
    return this.productModel
      .find({ store: storeId }, '-createdAt -updatedAt')
      .exec();
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

  async changeQuantity(products: OrderProduct[]) {
    const session = await this.productModel.db.startSession();
    session.startTransaction();

    try {
      for (const { product: id, takenQuantity } of products) {
        const product = await this.productModel.findById(id).session(session);

        if (!product) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }

        if (product.quantity < takenQuantity) {
          throw new BadRequestException(
            `Insufficient quantity for product with ID ${id}`,
          );
        }

        product.quantity -= takenQuantity;
        await product.save();
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    } finally {
      await session.endSession();
    }
  }
}
