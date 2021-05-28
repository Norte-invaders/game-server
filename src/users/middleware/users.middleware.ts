import express from "express";
import UsersDao from '../daos/users.dao';

class UsersMiddleware {

    async validateSameNicknameDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UsersDao.getUserByNickname(req.body.nickname);
        if (user) {
            res.status(400).send({ errors: [`User ${req.body.nickname} already exists`] });
        } else {
            next();
        }
    }

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UsersDao.getUserById(req.body.id);

        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                errors: [`User ${req.body.id} not found`],
            });
        }
    }

    async validateUserExistsByNickname(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UsersDao.getUserByNickname(req.body.nickname);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                errors: [`User ${req.body.nickname} not found`],
            });
        }
    }

    async extractUserId(
        req: express.Request,
        _res: express.Response,
        next: express.NextFunction
    ) {
        console.log(req.params)
        req.body.id = req.params.id;
        next();
    }

    async extractUserNickname(
        req: express.Request,
        _res: express.Response,
        next: express.NextFunction
    ) {
        req.body.nickname = req.params.nickanme;
        next();
    }
}

export default new UsersMiddleware();