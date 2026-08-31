import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsInProduct1775673483928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('product', [
      new TableColumn({
        name: 'category',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'subcategory',
        type: 'varchar',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('product', ['category', 'subcategory']);
  }
}
