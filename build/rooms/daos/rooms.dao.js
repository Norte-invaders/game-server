"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const room_1 = __importDefault(require("../../entities/room"));
const roomUsers_1 = __importDefault(require("../../entities/roomUsers"));
const users_dao_1 = __importDefault(require("../../users/daos/users.dao"));
class RoomsDao {
    constructor() {
    }
    async setRepository() {
        this.roomsRepository = await typeorm_1.getRepository(room_1.default);
        this.roomsWithUsersRepository = await typeorm_1.getRepository(roomUsers_1.default);
    }
    async addRom(roomFields) {
        const room = new room_1.default();
        room.title = roomFields.title;
        room.joinCode = roomFields.joinCode;
        room.maxParticipants = roomFields.maxParticipants;
        return await this.roomsRepository.save(room);
    }
    async getRoomByJoinCode(joinCode) {
        return await this.roomsRepository.findOne({ joinCode: joinCode });
    }
    async getRoomById(roomId) {
        return await this.roomsRepository.findOne(roomId);
    }
    async getRooms() {
        return await this.roomsRepository.find();
    }
    async addUserToRoom(userId, joinCode) {
        const user = await users_dao_1.default.getUserById(userId);
        const room = await this.getRoomByJoinCode(joinCode);
        if (!user) {
            throw new Error("user doesn't exists");
        }
        if (!room) {
            throw new Error("room doesn't exists");
        }
        const roomUser = new roomUsers_1.default();
        roomUser.roomId = room.id;
        roomUser.userId = user.id;
        return await this.roomsWithUsersRepository.save(roomUser);
    }
    async getUserInRoom(userId, roomId) {
        return await this.roomsWithUsersRepository.findOne({ userId: userId, roomId: roomId });
    }
    async getRoomUsers(roomId) {
        return await this.roomsWithUsersRepository.find({ roomId: roomId });
    }
}
exports.default = new RoomsDao();
