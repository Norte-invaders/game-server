import {MigrationInterface, QueryRunner} from "typeorm";

export class users1621630258857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"  ALTER COLUMN "avatarprofile" TYPE CHARACTER varying(500);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"  ALTER COLUMN "avatarprofile" TYPE CHARACTER varying(255);`);
    }

}
