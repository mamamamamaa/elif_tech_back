import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IProduct } from '../../../interfaces/product.interface';
export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly products?: IProduct[];
}

export class FindStoreByNameDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
