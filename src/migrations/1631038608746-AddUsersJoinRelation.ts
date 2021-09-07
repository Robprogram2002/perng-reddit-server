import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class AddUsersJoinRelation1631038608746 implements MigrationInterface {
  name = 'AddUsersJoinRelation1631038608746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_joined_subs_sub" ("userId" uuid NOT NULL, "subId" uuid NOT NULL, CONSTRAINT "PK_4679e674f6ad39fe1062414c20a" PRIMARY KEY ("userId", "subId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8297834e2b326ac20d20a740e3" ON "user_joined_subs_sub" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_30c9d13e6500aa15bd779ef314" ON "user_joined_subs_sub" ("subId") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_joined_subs_sub" ADD CONSTRAINT "FK_8297834e2b326ac20d20a740e34" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_joined_subs_sub" ADD CONSTRAINT "FK_30c9d13e6500aa15bd779ef314e" FOREIGN KEY ("subId") REFERENCES "sub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_joined_subs_sub" DROP CONSTRAINT "FK_30c9d13e6500aa15bd779ef314e"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_joined_subs_sub" DROP CONSTRAINT "FK_8297834e2b326ac20d20a740e34"`
    );
    await queryRunner.query(`DROP INDEX "IDX_30c9d13e6500aa15bd779ef314"`);
    await queryRunner.query(`DROP INDEX "IDX_8297834e2b326ac20d20a740e3"`);
    await queryRunner.query(`DROP TABLE "user_joined_subs_sub"`);
  }
}
