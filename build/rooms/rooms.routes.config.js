"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const rooms_controller_1 = __importDefault(require("./controllers/rooms.controller"));
const users_middleware_1 = __importDefault(require("../users/middleware/users.middleware"));
const rooms_middleware_1 = __importDefault(require("./middlewares/rooms.middleware"));
class RoomsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'RoomsRoutes');
    }
    configureRoutes() {
        // /rooms/create
        // /rooms/join/:joinCode
        // Receive userId
        this.app
            .route('/rooms/create')
            .post(rooms_controller_1.default.createRoom);
        this.app
            .route('/rooms/join/:joinCode')
            .post(rooms_middleware_1.default.extractJoinCode, rooms_middleware_1.default.validateRoomExists, users_middleware_1.default.validateUserExists, rooms_middleware_1.default.validateUserNotInRoom, rooms_controller_1.default.joinUserToRoom);
        return this.app;
    }
}
exports.RoomsRoutes = RoomsRoutes;
