import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/interfaces/product.repository.interface';
import { Repository } from 'typeorm';

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
