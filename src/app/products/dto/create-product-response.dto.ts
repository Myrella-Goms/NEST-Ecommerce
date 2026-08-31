import { ApiProperty } from '@nestjs/swagger';

export class CreateProductResponseDto {
  @ApiProperty({
    description: 'The unique identifier of a new product',
  })
  id: string;
}
