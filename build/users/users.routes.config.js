"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const express_validator_1 = require("express-validator");
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {
        this.app
            .route('/users')
            .post(
                express_validator_1.body('email').isEmail(),
                express_validator_1.body('nickname').isString(),
                body_validation_middleware_1.default.verifyBodyFieldsErrors,
                users_middleware_1.default.validateSameNicknameDoesntExist,
                users_controller_1.default.createUser
            );
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
