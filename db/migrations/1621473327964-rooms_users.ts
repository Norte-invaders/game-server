import {MigrationInterface, QueryRunner} from "typeorm";

export class roomsUsers1621473327964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE rooms_users (
                id SERIAL,
                room_id INT NOT NULL,
                user_id INT NOT NULL,
                CONSTRAINT fk_rooms_user_id FOREIGN KEY (user_id) REFERENCES users (id),
                CONSTRAINT fk_rooms_room_id FOREIGN KEY (room_id) REFERENCES rooms (id),
                CONSTRAINT pk_rooms_users_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE room_users CASCADE
        `);
    }
}
