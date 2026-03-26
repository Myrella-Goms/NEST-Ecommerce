import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { ProductRepository } from './database/product.repository';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductRepository],
})
export class InfraModule {}
