export interface IOrder {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly store: string;
  readonly totalPrice: number;
  readonly products: OrderProduct[];
}

export interface OrderProduct {
  readonly product: string;
  readonly store: string;
  readonly takenQuantity: number;
}
