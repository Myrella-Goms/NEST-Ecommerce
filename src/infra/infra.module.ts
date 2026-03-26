import { Module } from '@nestjs/common';
import { ProductRepository } from './database/product.repository';

@Module({
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: ['IProductRepository'],
})
export class InfraModule {}
