import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProduct1774383079550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "valor" TO "value"`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "marca" TO "brand"`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "quantidade" TO "amount"`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" 
    ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" 
    ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" 
     ALTER COLUMN "value" TYPE DECIMAL(10,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ALTER COLUMN "value" TYPE DECIMAL(10,2)
    `);

    await queryRunner.query(`
      ALTER TABLE "product"
      DROP COLUMN IF EXISTS "updatedAt"
    `);

    await queryRunner.query(`
      ALTER TABLE "product"
      DROP COLUMN IF EXISTS "createdAt"
    `);

    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "amount" TO "quantidade"`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "brand" TO "marca"`,
    );

    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "value" TO "valor"`,
    );
  }
}
