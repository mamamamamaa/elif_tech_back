import { Document } from 'mongoose';
import { IStore } from './store.interface';

export interface IProduct extends Document {
  readonly name: string;
  readonly price: number;
  quantity: number;
  readonly image: string;
  readonly store: IStore['_id'];
}
