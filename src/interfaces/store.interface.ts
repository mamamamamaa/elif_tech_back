import { Document } from 'mongoose';

export interface IStore extends Document {
  readonly name: string;
  readonly products: Array<IProduct['_id']>;
}

export interface IProduct extends Document {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly image: string;
  readonly store: IStore['_id'];
}
