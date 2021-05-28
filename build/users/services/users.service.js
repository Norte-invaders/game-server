"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../daos/users.dao"));
class UsersService {
    async create(resource) {
        return users_dao_1.default.createUser(resource);
    }
    async getUserById(id) {
        return users_dao_1.default.getUserById(id);
    }
    async getUserByNickname(nickname) {
        return users_dao_1.default.getUserByNickname(nickname);
    }
}
exports.default = new UsersService();
