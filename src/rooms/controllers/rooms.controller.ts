import express from "express";
import roomsService from '../services/rooms.services';
import RoomsDao from '../daos/rooms.dao'
import {generate} from "../../utils/shortid";

class RoomsController {
    async createRoom(req: express.Request, res: express.Response) {
        const joinCode = generate(6)
        const userId = res.locals.user.id;
        const title = `room-${joinCode}`;

        const data = await roomsService.create({
            joinCode,
            title,
            maxParticipants: 2,
            ownerId: userId
        });

        await RoomsDao.addUserToRoom(req.body.id, data.id);
        await data.reload();

        res.status(200).send(data);
    }

    async joinUserToRoom(_req: express.Request, res: express.Response) {
        const room = res.locals.room;
        await RoomsDao.addUserToRoom(res.locals.user.id, room.id);
        await room.reload();
        res.status(200).send( room );
    }

    async getRooms(_req: express.Request, res: express.Response) {
        const rooms = await roomsService.getRooms();
        res.status(200).send( rooms );
    }

    async getUsers(_req: express.Request, res: express.Response) {
        const roomId = res.locals.room.id;
        const rooms = await roomsService.getUsersInRoom(roomId);
        res.status(200).send( rooms );
    }

}

export default new RoomsController();