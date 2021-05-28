import {MigrationInterface, QueryRunner} from "typeorm";

export class rooms1621472890760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE rooms (
                id SERIAL,
                title VARCHAR(255) NOT NULL,
                joinCode VARCHAR(255) NOT NULL,
                maxParticipants INTEGER NOT NULL,
                CONSTRAINT unique_rooms_title UNIQUE (title),
                CONSTRAINT unique_rooms_joinCode UNIQUE(joinCode),
                CONSTRAINT pk_rooms_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms');
    }

}
