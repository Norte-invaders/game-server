"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../daos/users.dao"));
class UsersMiddleware {
    async validateSameNicknameDoesntExist(req, res, next) {
        const user = await users_dao_1.default.getUserByNickname(req.body.nickname);
        if (user) {
            res.status(400).send({ errors: ['User nickname already exists'] });
        }
        else {
            next();
        }
    }
    async validateUserExists(req, res, next) {
        const user = await users_dao_1.default.getUserById(req.body.user_id);
        if (user) {
            res.locals.user = user;
            next();
        }
        else {
            res.status(404).send({
                errors: [`User ${req.body.user_id} not found`],
            });
        }
    }
    async extractUserId(req, _res, next) {
        console.log(req.params);
        req.body.id = req.params.id;
        next();
    }
}
exports.default = new UsersMiddleware();
