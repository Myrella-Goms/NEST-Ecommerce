import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: Partial<ProductEntity>[]): Promise<ProductEntity[]>;
}
