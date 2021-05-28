import {getConnection, getRepository} from "typeorm";
import Room from "../../entities/room";
import { CreateRoomDto } from "../dto/create.room.dto";
import RoomUsers from "../../entities/roomUsers";
import User from "../../entities/user";

class RoomsDao {

    constructor() {
    }

    async addRom(roomFields: CreateRoomDto) {
        const room = await Room.create({
            title: roomFields.title,
            joinCode: roomFields.joinCode,
            maxParticipants: roomFields.maxParticipants,
            ownerId: roomFields.ownerId,
            totalParticipants: 0
        });

        return await room.save();
    }

    async getRoomByJoinCode(joinCode: string) {
        return await Room.findOne({ joinCode: joinCode});
    }

    async getRoomById(roomId: number) {
        return await Room.findOne(roomId);
    }

    async getRooms() {
        return await Room.find();
    }

    async addUserToRoom(userId: number, roomId: number) {
        const roomUser = await RoomUsers.create({
            userId: userId,
            roomId: roomId,
        })

        await getConnection().createQueryBuilder()
            .update(Room)
            .where({ id: roomId })
            .set({ totalParticipants: () => "total_participants + 1" })
            .execute();

        return await roomUser.save();
    }

    async getUserInRoom(userId: number, roomId: number) {
        return await RoomUsers.findOne({ userId, roomId })
    }

    async getRoomUsers(roomId: number) {
        return await getRepository(User)
            .createQueryBuilder("u")
            .leftJoin(RoomUsers, "ru", 'ru."userId" = u.id')
            .where('ru."roomId" = :roomId', { roomId })
            .getMany();
    }

}

export default new RoomsDao();