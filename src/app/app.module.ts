import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/product/product.controller';
import envConfig from '../config/env.config';
import { InfraModule } from '../infra/infra.module';
import { PostgresClientFactory } from '../infra/postgres-client.factory';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresClientFactory,
    }),
    InfraModule,
    DomainModule,
  ],
  controllers: [ProductsController],
  providers: [PostgresClientFactory],
})
export class AppModule {}
