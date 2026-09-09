import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env.config';
import { InfraModule } from '../infra/infra.module';
import { PostgresClientFactory } from '../infra/postgres-client.factory';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/product.module';

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
    UsersModule,
    ProductModule,
  ],
  controllers: [],
  providers: [PostgresClientFactory],
})
export class AppModule {}
