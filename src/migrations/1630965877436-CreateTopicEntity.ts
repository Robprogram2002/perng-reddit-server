import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateTopicEntity1630965877436 implements MigrationInterface {
  name = 'CreateTopicEntity1630965877436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(250) NOT NULL, CONSTRAINT "UQ_15f634a2dbf62a79bb726fc6158" UNIQUE ("name"), CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sub_sub_topics_topic" ("subId" uuid NOT NULL, "topicId" uuid NOT NULL, CONSTRAINT "PK_d538ca37a91f573c95573dc83f0" PRIMARY KEY ("subId", "topicId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0559e771adfcf48172eac33d7c" ON "sub_sub_topics_topic" ("subId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72e8d0aad8ab992bde5a3dbedb" ON "sub_sub_topics_topic" ("topicId") `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sub_settings_nameformat_enum" AS ENUM('only', 'hidden', 'together')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" ADD "nameFormat" "public"."sub_settings_nameformat_enum" NOT NULL DEFAULT 'together'`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD "mainTopicId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD CONSTRAINT "UQ_0dcfeef132a7b439e0339602537" UNIQUE ("mainTopicId")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" ADD CONSTRAINT "FK_0dcfeef132a7b439e0339602537" FOREIGN KEY ("mainTopicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sub_sub_topics_topic" ADD CONSTRAINT "FK_0559e771adfcf48172eac33d7cf" FOREIGN KEY ("subId") REFERENCES "sub"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "sub_sub_topics_topic" ADD CONSTRAINT "FK_72e8d0aad8ab992bde5a3dbedb1" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_sub_topics_topic" DROP CONSTRAINT "FK_72e8d0aad8ab992bde5a3dbedb1"`
    );
    await queryRunner.query(
      `ALTER TABLE "sub_sub_topics_topic" DROP CONSTRAINT "FK_0559e771adfcf48172eac33d7cf"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP CONSTRAINT "FK_0dcfeef132a7b439e0339602537"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP CONSTRAINT "UQ_0dcfeef132a7b439e0339602537"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub" DROP COLUMN "mainTopicId"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sub_settings" DROP COLUMN "nameFormat"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sub_settings_nameformat_enum"`
    );
    await queryRunner.query(`DROP INDEX "IDX_72e8d0aad8ab992bde5a3dbedb"`);
    await queryRunner.query(`DROP INDEX "IDX_0559e771adfcf48172eac33d7c"`);
    await queryRunner.query(`DROP TABLE "sub_sub_topics_topic"`);
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
