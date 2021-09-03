import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubSettingsEntity1630686808710
  implements MigrationInterface
{
  name = 'CreateSubSettingsEntity1630686808710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "sub_settings_bannersize_enum" AS ENUM('small', 'medium', 'large')`
    );
    await queryRunner.query(
      `CREATE TABLE "sub_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "baseColor" character varying(100) NOT NULL DEFAULT '#0079d3', "highlightColor" character varying(100) NOT NULL DEFAULT '#0079d3', "bodyBackground" character varying(250) NOT NULL DEFAULT '#DAE0E6', "bannerSize" "sub_settings_bannersize_enum" NOT NULL DEFAULT 'small', "postTitleColor" character varying(100) NOT NULL DEFAULT '#000000', "postBackground" character varying(250) NOT NULL DEFAULT '#ffffff', CONSTRAINT "PK_7c48ccc1caa3d26a6233a299866" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "public"."sub" ADD "settingsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD CONSTRAINT "UQ_3bca6e5b52f26f9e25b5ddec457" UNIQUE ("settingsId")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD CONSTRAINT "FK_3bca6e5b52f26f9e25b5ddec457" FOREIGN KEY ("settingsId") REFERENCES "sub_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP CONSTRAINT "FK_3bca6e5b52f26f9e25b5ddec457"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP CONSTRAINT "UQ_3bca6e5b52f26f9e25b5ddec457"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP COLUMN "settingsId"`
    );
    await queryRunner.query(`DROP TABLE "sub_settings"`);
    await queryRunner.query(`DROP TYPE "sub_settings_bannersize_enum"`);
  }
}
