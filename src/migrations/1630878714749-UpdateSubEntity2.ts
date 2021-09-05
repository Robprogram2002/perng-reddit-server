import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class UpdateSubEntity21630878714749 implements MigrationInterface {
  name = 'UpdateSubEntity21630878714749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."sub" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "title" character varying(250)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "title"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD "title" character varying(250)`
    );
  }
}
