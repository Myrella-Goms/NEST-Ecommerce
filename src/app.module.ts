import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from './config/env.config';
import { PostgresClientFactory } from './infra/postgres-client.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: PostgresClientFactory,
    }),
  ],
  controllers: [],
  providers: [PostgresClientFactory],
})
export class AppModule {}
