import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class CreateUser1788096465783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '15',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'lastTimeSignIn',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
