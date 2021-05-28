"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    async createUser(req, res) {
        const { nickname, email, avatarProfile } = req.body;
        const provider = 'basic';
        const oauthID = `${nickname}-${email}`;
        const user = {
            nickname,
            email,
            avatarProfile,
            provider,
            oauthID
        };
        const userData = await users_service_1.default.create(user);
        res.status(201).send({ user_id: userData.id });
    }
}
exports.default = new UsersController();
