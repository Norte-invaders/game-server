import express from "express";
import RoomsService from '../services/rooms.services';

class RoomsMiddleware {

    async validateRoomExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const room = await RoomsService.getRoomByJoinCode(req.body.joinCode)
        if (room) {
            res.locals.room = room;
            next()
            return;
        }

        res.status(404).send({
            errors: [`Room ${req.params.joinCode} not found`]
        })
    }

    async validateUserNotInRoom(
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const room = res.locals.room;
        const user = await RoomsService.userIsInRoom(res.locals.user.id, room.id);

        if (!user) {
            next()
            return
        }

        res.status(400).send({
            errors: [`User ${res.locals.user.nickname} is already in ${room.title}`]
        })
    }

    async validateIfRoomIsFull(
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

        const room = res.locals.room;
        const users = await RoomsService.getUsersInRoom(room.id);

        if (users.length < room.maxParticipants && room.maxParticipants > room.totalParticipants) {
            next();
            return;
        }

        res.status(400).send({
            errors: [`Room ${room.title} is full`]
        })
    }

    async extractJoinCode(
        req: express.Request,
        _res: express.Response,
        next: express.NextFunction
    ) {
        req.body.joinCode = req.params.joinCode;
        next();
    }
}

export default new RoomsMiddleware();