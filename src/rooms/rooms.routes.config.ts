import { CommonRoutesConfig } from '../common/common.routes.config';
import RoomsController from './controllers/rooms.controller';
import UsersMiddleware from '../users/middleware/users.middleware';
import RoomsMiddleware from './middlewares/rooms.middleware';

import express from "express";
import { body } from "express-validator";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";

export class RoomsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'RoomsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/rooms/create')
            .post(
                UsersMiddleware.validateUserExists,
                RoomsController.createRoom
            )

        this.app
            .route('/rooms/join/:joinCode')
            .post(
                body('id').isNumeric(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                RoomsMiddleware.extractJoinCode,
                RoomsMiddleware.validateRoomExists,
                UsersMiddleware.validateUserExists,
                RoomsMiddleware.validateIfRoomIsFull,
                RoomsMiddleware.validateUserNotInRoom,
                RoomsController.joinUserToRoom
            )

        this.app
            .route('/rooms')
            .get(
                RoomsController.getRooms
            )

        this.app
            .route('/rooms/:joinCode/users')
            .get(
                RoomsMiddleware.extractJoinCode,
                RoomsMiddleware.validateRoomExists,
                RoomsController.getUsers
            )

        return this.app;
    }
}