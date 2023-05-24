import { IsArray, IsNumber, IsString } from 'class-validator';
import { OrderProduct } from '../interfaces/order.interface';

export class CreateOrderDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly address: string;
  @IsString()
  readonly storeId: string;
  @IsArray()
  readonly products: OrderProduct[];
  @IsNumber()
  readonly totalPrice: number;
}
