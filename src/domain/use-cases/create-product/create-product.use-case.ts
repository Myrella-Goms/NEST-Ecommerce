import { Inject, Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from 'src/domain/dto/create-product-request.dto';
import { CreateProductResponseDto } from 'src/domain/dto/create-product-response.dto';
import type { IProductRepository } from 'src/domain/interfaces/product.repository.interface';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}
  async createProduct(
    product: CreateProductRequestDto[],
  ): Promise<CreateProductResponseDto[]> {
    const newProduct = await this.productRepository.createProduct(product);
    return newProduct;
  }
}
