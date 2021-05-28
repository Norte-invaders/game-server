import {CreateRoomDto} from "../dto/create.room.dto";
import RoomsDao from '../daos/rooms.dao';

class RoomsService {
    async create(resource: CreateRoomDto) {
        return RoomsDao.addRom(resource);
    }

    async getRoomById(roomId: number) {
        return RoomsDao.getRoomById(roomId);
    }

    async getRoomByJoinCode(joinCode: string) {
        return RoomsDao.getRoomByJoinCode(joinCode);
    }

    async userIsInRoom(userId: number, roomId: number) {
        return await RoomsDao.getUserInRoom(userId, roomId);
    }

    async getUsersInRoom(roomId: number) {
        return await RoomsDao.getRoomUsers(roomId);
    }

    async getRooms() {
        return await RoomsDao.getRooms();
    }
}

export default new RoomsService();