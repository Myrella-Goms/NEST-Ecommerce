import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../create-product/create-product.use-case';
import { CreateProductRequestDto } from '../dto/create-product-request.dto';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';

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
