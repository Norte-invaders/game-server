"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("../../entities/user"));
class UsersDao {
    constructor() {
    }
    async setRepository() {
        this.usersRepository = await typeorm_1.getRepository(user_1.default);
    }
    async createUser(userData) {
        const user = new user_1.default();
        user.oauthID = userData.oauthID;
        user.nickname = userData.nickname;
        user.email = userData.email;
        user.provider = userData.provider;
        user.avatarProfile = userData.avatarProfile;
        await this.usersRepository.save(user);
        return user;
    }
    async getUserByOauthID(oauthID) {
        return await this.usersRepository.findOne({ oauthID });
    }
    async getUserById(id) {
        return await this.usersRepository.findOne({ id });
    }
    async getUserByNickname(nickname) {
        return await this.usersRepository.findOne({ nickname });
    }
}
exports.default = new UsersDao();
