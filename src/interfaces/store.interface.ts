import { Document } from 'mongoose';

export interface IStore extends Document {
  name: string;
  products: Array<IProduct['_id']>;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: IStore['_id'];
}
