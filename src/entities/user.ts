import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Room from "./room";
import RoomUsers from "./roomUsers";

@Entity('users')
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    nickname!: string;

    @OneToMany(() => Room, room => room.owner)
    rooms!: Room[];

    @OneToMany(() => RoomUsers, roomUsers => roomUsers.user)
    joinedRooms!: Room[];
}

export default User;