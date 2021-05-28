import { CommonRoutesConfig } from '../common/common.routes.config';
import express from "express";
import {body} from "express-validator";
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/users')
            .post(
                body('nickname').isString(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameNicknameDoesntExist,
                UsersController.createUser
            );

        this.app
            .route('/users/:nickanme')
            .get(
                UsersMiddleware.extractUserNickname,
                UsersMiddleware.validateUserExistsByNickname,
                UsersController.getUser
            )

        return this.app;
    }
}