import { IProduct } from '../../store/interfaces/product.interface';

export interface IOrderInterface {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly totalPrice: number;
  readonly products: OrderProduct[];
}

export interface OrderProduct {
  product: IProduct;
  quantity: number;
}
