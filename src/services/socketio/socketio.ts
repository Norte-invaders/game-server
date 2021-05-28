import * as http from "http";
import * as https from "https";
import {Server, Socket} from 'socket.io';
import User from "../../entities/user";
import Room from "../../entities/room";
import RoomsService from "../../rooms/services/rooms.services";


class Socketio {
    private ioHttp: Server;
    // @ts-ignore
    private ioHttps: Server;

    constructor(httpServer: http.Server, httpsServer: https.Server) {

        this.ioHttp = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        })

        this.ioHttps = new Server(httpsServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        })

        this.ioHttp.on('connection', this._onConnection);
        // this.ioHttps.on('connection', this._onConnection2);
    }

    _onConnection(socket: Socket) {
        console.log('new socket ' + socket.id);
        console.log(socket.handshake.query.userId)

        socket.on('join-room', async (userData, roomData) => {
            const user: User = JSON.parse(userData);
            const room: Room = JSON.parse(roomData);
            const users: User[] = await RoomsService.getUsersInRoom(room.id);

            // @ts-ignore
            socket.roomTitle = room.title;

            console.log("joined")
            socket.join(room.title);
            socket.emit('user-joined', room, users)
            socket.to(room.title).emit('new-user', users, user);

            if (room.totalParticipants == room.maxParticipants) {

                let counter = 10;
                let countdown = setInterval(function(){
                    socket.to(room.title).emit('count-down', counter)
                    socket.emit('count-down', counter)

                    counter--

                    if (counter === 0) {
                        clearInterval(countdown);
                        socket.to(room.title).emit('start-match', counter)
                        socket.emit('start-match', counter)
                    }
                }, 1000);


            }
        });

        socket.on('send-aliens', aliens => {
            // @ts-ignore
            socket.to(socket.roomTitle).emit('update-aliens', JSON.parse(aliens));
            console.log(JSON.parse(aliens))
        })

        socket.on('initialize-room', (player1, player2) => {
            // @ts-ignore
            socket.to(socket.roomTitle).emit('room-initialized', player1, player2);
            socket.emit('room-initialized', player1, player2);
        })

        socket.on('remote-send', (data) => {
            // @ts-ignore
            socket.to(socket.roomTitle).emit('player-updated', data);
        });

    }


}

export { Socketio };