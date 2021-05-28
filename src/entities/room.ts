import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import RoomUsers from "./roomUsers";
import User from "./user";

@Entity('rooms')
class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', unique: true })
    title!: string;

    @Column()
    ownerId!: number;
    @ManyToOne(() => User, user => user.rooms)
    @JoinColumn({name: 'ownerId'})
    owner!: User;

    @OneToMany(() => RoomUsers, roomUsers => roomUsers.room)
    spaces!: RoomUsers[];

    @Column({ type: 'varchar', unique: true, name: 'join_code', nullable: false  })
    joinCode!: string;

    @Column({ type: 'integer', name: 'max_participants', nullable: false })
    maxParticipants!: number;

    @Column({ type: 'integer', name: 'total_participants', nullable: false })
    totalParticipants!: number;
}

export default Room;