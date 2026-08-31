import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { IProductRepository } from './interfaces/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    product: Partial<ProductEntity>[],
  ): Promise<ProductEntity[]> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }
}
