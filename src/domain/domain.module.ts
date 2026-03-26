import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './use-cases/create-product/create-product.use-case';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [CreateProductUseCase],
  exports: [CreateProductUseCase],
})
export class DomainModule {}
