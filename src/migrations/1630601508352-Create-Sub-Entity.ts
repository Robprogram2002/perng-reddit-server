import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateSubEntity1630601508352 implements MigrationInterface {
  name = 'CreateSubEntity1630601508352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "sub_type_enum" AS ENUM('private', 'restricted', 'public')`
    );
    await queryRunner.query(
      `CREATE TABLE "sub" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(250) NOT NULL, "title" character varying(250), "profileUrl" character varying(250), "bannerUrl" character varying(250), "type" "sub_type_enum" NOT NULL, "adultContent" boolean NOT NULL DEFAULT false, "description" text, "username" character varying(250) NOT NULL, CONSTRAINT "UQ_e45db8a9bd5a3af6e3595628fb7" UNIQUE ("name"), CONSTRAINT "PK_aaa48ae541d7446ee5fff28e732" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "sub" ADD CONSTRAINT "FK_69ff4929b07442e20f66664ba73" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub" DROP CONSTRAINT "FK_69ff4929b07442e20f66664ba73"`
    );
    await queryRunner.query(`DROP TABLE "sub"`);
    await queryRunner.query(`DROP TYPE "sub_type_enum"`);
  }
}
