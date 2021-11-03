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

app.use(expressWinston.logger(loggerOptions));


const start = async () => {
    await createConnection();

    new Socketio(httpServer, httpsServer);

    routes.push(new UsersRoutes(app));
    routes.push(new RoomsRoutes(app))

    httpServer.listen(process.env.PORT, () => {
        routes.forEach((route: CommonRoutesConfig) => {
            console.log(`Routes configured for ${route.getName()}`);
        });
        console.log('Running on http ' + process.env.PORT);
    });
};

start().catch(console.error);
