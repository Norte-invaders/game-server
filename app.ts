import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import dotenv from 'dotenv'
import * as https from "https";
import * as fs from "fs";
import {createConnection } from "typeorm";
import 'reflect-metadata';

import { CommonRoutesConfig } from "./src/common/common.routes.config";
import { UsersRoutes } from "./src/users/users.routes.config";
import { RoomsRoutes } from "./src/rooms/rooms.routes.config";
import { Socketio } from "./src/services/socketio/socketio";

dotenv.config()

const certFile = fs.readFileSync('./keys/server.cert');
const keyFile = fs.readFileSync('./keys/server.key');

const app: express.Application = express();
const routes: Array<CommonRoutesConfig> = [];
const httpServer: http.Server = http.createServer(app);
const httpsServer: https.Server = https.createServer({
    key: keyFile,
    cert: certFile,
}, app);

app.use(express.json());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
}

// app.use(expressWinston.logger(loggerOptions));


const start = async () => {
    await createConnection();

    // const user = await User.create({nickname: 'test3'})
    // console.log(user)
    // await user.save();
    //
    // const user2 = await User.create({nickname: 'test34'})
    // console.log(user)
    // await user2.save();
    //
    // const room = await Room.create({title: 'test room multi 1233', maxParticipants: 2, joinCode: 'JOINCO123123123DE', ownerId: user.id})
    // console.log(room)
    // await room.save()
    //
    // console.log(await Room.find({
    //     where: {
    //         ownerId: user.id
    //     },
    //     relations: ['owner']
    // }))
    //
    // const roomsUser = await RoomUsers.create({userId: user.id, roomId: room.id})
    // const roomsUser2 = await RoomUsers.create({userId: user2.id, roomId: room.id})
    //
    // await roomsUser.save();
    // await roomsUser2.save();
    //
    //
    // const result2 = await RoomUsers.find({
    //     where: {
    //         roomId: room.id,
    //     },
    //     relations: ['user', 'room']
    // })
    //
    // console.log(result2);
    // console.log(result2[0]);
    // console.log(result2[0].user);

    // const result = await User.find({
    //     relations: ['joinedRooms']
    // })
    //
    // console.log(result)
    //
    // const result2 = await getRepository(User)
    //     .createQueryBuilder("u")
    //     .leftJoin(RoomUsers, "ru", 'ru."userId" = u.id')
    //     .where('ru."roomId" = :roomId', {roomId: 19})
    //     .getMany();
    //
    // console.log(result2)



    new Socketio(httpServer, httpsServer);

    routes.push(new UsersRoutes(app));
    routes.push(new RoomsRoutes(app))

    httpServer.listen(process.env.PORT, () => {
        routes.forEach((route: CommonRoutesConfig) => {
            console.log(`Routes configured for ${route.getName()}`);
        });
        console.log('Running on http ' + process.env.PORT);
    });

    httpsServer.listen(process.env.PORT_HTTPS, () => {
        console.log('Running on https ' + process.env.PORT_HTTPS);
    });
};

start().catch(console.error);
