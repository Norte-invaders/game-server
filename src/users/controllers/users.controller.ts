import express from 'express';
import usersService from '../services/users.service';

class UsersController {
    async createUser(req: express.Request, res: express.Response) {
        const { nickname } = req.body
        const user = {
            nickname,
        }

        const userData = await usersService.create(user);

        res.status(201).send(userData);
    }

    async getUser(_req: express.Request, res: express.Response) {
        res.status(200).send(res.locals.user);
    }
}

export default new UsersController();
