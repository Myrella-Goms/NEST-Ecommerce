import { Inject, Injectable } from '@nestjs/common';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { CreateProductRequestDto } from '../dto/create-product-request.dto';
import type { IProductRepository } from '../interfaces/product.repository.interface';

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
