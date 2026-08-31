import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({
    description: 'The name of new the product',
    example: 'Notebook',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'The subcategory of the product',
    example: 'Laptops',
  })
  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @ApiProperty({ description: 'The value of the product', example: '150.55' })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'The name of the product', example: 'Apple' })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'The amount of the product', example: '50' })
  @IsNotEmpty()
  amount: number;
}
