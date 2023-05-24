export interface IOrderInterface {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly storeId: string;
  readonly totalPrice: number;
  readonly products: OrderProduct[];
}

export interface OrderProduct {
  readonly productId: string;
  readonly storeId: string;
  readonly quantity: number;
}
