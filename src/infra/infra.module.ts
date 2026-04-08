import { Module } from '@nestjs/common';
import { ProductRepository } from './database/product.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: ['IProductRepository'],
})
export class InfraModule {}
