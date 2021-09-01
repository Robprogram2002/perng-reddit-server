import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class UpdateUser1630512758930 implements MigrationInterface {
  name = 'UpdateUser1630512758930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "authProvider"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_authprovider_enum" AS ENUM('local', 'google', 'github', 'facebook')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "authProvider" "public"."user_authprovider_enum" NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "password" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "password" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "authProvider"`
    );
    await queryRunner.query(`DROP TYPE "public"."user_authprovider_enum"`);
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "authProvider" character varying NOT NULL`
    );
  }
}
