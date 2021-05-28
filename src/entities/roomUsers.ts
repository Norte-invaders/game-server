import {BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import User from "./user";
import Room from "./room";

@Entity('rooms_users')
class RoomUsers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;


    @PrimaryColumn()
    userId!: number;
    @ManyToOne(() => User, user => user.joinedRooms)
    @JoinColumn({name: 'userId'})
    user!: User;

    @PrimaryColumn()
    roomId!: number;
    @ManyToOne(() => Room, room => room.spaces)
    @JoinColumn({name: 'roomId'})
    room!: Room;
}

export default RoomUsers;