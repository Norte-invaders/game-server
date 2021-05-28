import {MigrationInterface, QueryRunner} from "typeorm";

export class rooms1621551456800 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "joincode" TO "join_code"`);
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "maxparticipants" TO "max_participants"`);

    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "join_code" TO "join_code"`);
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "max_participants" TO "maxparticipants"`);
    }

}
