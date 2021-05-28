import {MigrationInterface, QueryRunner} from "typeorm";

export class users1621480870146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL,
                oauthID VARCHAR(255) NOT NULL,
                nickname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                provider VARCHAR(255) NOT NULL,
                avatarProfile VARCHAR(255) NOT NULL,
                CONSTRAINT unique_users_email UNIQUE (email),
                CONSTRAINT unique_users_oauthid UNIQUE (oauthID),
                CONSTRAINT pk_users_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }


}
