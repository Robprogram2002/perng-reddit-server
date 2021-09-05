import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class UpdateSubEntity1630871237028 implements MigrationInterface {
  name = 'UpdateSubEntity1630871237028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP COLUMN "profileUrl"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP COLUMN "bannerUrl"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "profile" text`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "banner" text`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "bodyBackground"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "bodyBackground" text NOT NULL DEFAULT '{"type":"color","value":"#DAE0E6"}'`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "postBackground"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "postBackground" text NOT NULL DEFAULT '{"type":"color","value":"#ffffff"}'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "postBackground"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "postBackground" character varying(250) NOT NULL DEFAULT '#ffffff'`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "bodyBackground"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "bodyBackground" character varying(250) NOT NULL DEFAULT '#DAE0E6'`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "banner"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "profile"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD "bannerUrl" character varying(250)`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD "profileUrl" character varying(250)`
    );
  }
}
