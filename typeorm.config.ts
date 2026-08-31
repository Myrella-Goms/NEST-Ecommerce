import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProductEntity } from './src/app/products/entities/product.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'admin',
  password: process.env.DB_PASSWORD ?? 'admin',
  database: process.env.DB_NAME ?? 'ecommerce',
  entities: [ProductEntity],
  migrations: ['src/infra/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
