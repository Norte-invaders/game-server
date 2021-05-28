"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_services_1 = __importDefault(require("../services/rooms.services"));
const rooms_dao_1 = __importDefault(require("../daos/rooms.dao"));
const shortid_1 = require("../../utils/shortid");
class RoomsController {
    async createRoom(req, res) {
        const joinCode = shortid_1.generate(6);
        const title = `room-${joinCode}`;
        const data = await rooms_services_1.default.create({ joinCode, title, maxParticipants: 2 });
        const rooms = await rooms_dao_1.default.addUserToRoom(req.body.user_id, data.joinCode);
        const newObj = {
            data,
            rooms,
        };
        res.status(200).send(newObj);
    }
    async joinUserToRoom(req, res) {
        const rooms = await rooms_dao_1.default.addUserToRoom(req.body.user_id, req.body.joinCode);
        res.status(200).send(rooms);
    }
}
exports.default = new RoomsController();
