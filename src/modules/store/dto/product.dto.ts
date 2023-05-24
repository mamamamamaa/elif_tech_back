import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly price: number;
  @IsNumber()
  readonly quantity: number;
  @IsString()
  readonly image: string;
}
