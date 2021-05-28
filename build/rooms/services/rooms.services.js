"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_dao_1 = __importDefault(require("../daos/rooms.dao"));
class RoomsService {
    async create(resource) {
        return rooms_dao_1.default.addRom(resource);
    }
    async getRoomById(roomId) {
        return rooms_dao_1.default.getRoomById(roomId);
    }
    async getRoomByJoinCode(joinCode) {
        return rooms_dao_1.default.getRoomByJoinCode(joinCode);
    }
    async userIsInRoom(userId, roomId) {
        return await rooms_dao_1.default.getUserInRoom(userId, roomId);
    }
}
exports.default = new RoomsService();
