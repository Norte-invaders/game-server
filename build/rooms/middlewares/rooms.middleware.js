"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_services_1 = __importDefault(require("../services/rooms.services"));
class RoomsMiddleware {
    async validateRoomExists(req, res, next) {
        const room = await rooms_services_1.default.getRoomByJoinCode(req.body.joinCode);
        if (room) {
            res.locals.room = room;
            next();
            return;
        }
        res.status(404).send({
            errors: [`Room ${req.params.joinCode} not found`]
        });
    }
    async validateUserNotInRoom(req, res, next) {
        const room = res.locals.room;
        const user = await rooms_services_1.default.userIsInRoom(req.body.user_id, room.id);
        if (!user) {
            next();
            return;
        }
        res.status(400).send({
            errors: [`User ${req.body.user_id} is already in ${room.title}`]
        });
    }
    async extractJoinCode(req, _res, next) {
        req.body.joinCode = req.params.joinCode;
        next();
    }
}
exports.default = new RoomsMiddleware();
