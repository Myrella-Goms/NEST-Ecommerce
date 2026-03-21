import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'varchar', length: 50 })
  marca: string;

  @Column({ type: 'int' })
  quantidade: number;
}
