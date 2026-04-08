import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { CreateProductRequestDto } from 'src/domain/dto/create-product-request.dto';
import { CreateProductResponseDto } from 'src/domain/dto/create-product-response.dto';
import { CreateProductUseCase } from 'src/domain/use-cases/create-product/create-product.use-case';

@Controller('products')
export class ProductsController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async createProducts(
    @Body(new ParseArrayPipe({ items: CreateProductRequestDto }))
    product: CreateProductRequestDto[],
  ): Promise<CreateProductResponseDto[]> {
    return await this.createProductUseCase.createProduct(product);
  }
}
