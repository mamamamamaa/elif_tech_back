import { IProduct } from '../interfaces/product.interface';

export class CreateStoreDto {
  readonly name: string;
  readonly products: IProduct[];
}
