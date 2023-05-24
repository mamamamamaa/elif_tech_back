import { Document } from 'mongoose';
import { IProduct } from './product.interface';

export interface IStore extends Document {
  readonly name: string;
  readonly address: string;
  readonly products: Array<IProduct['_id']>;
}
