import { PlayerClient } from './PlayerClient';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3001;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

let connectedUsers = [];
let idPool = 0;

io.on('connection', (socket) => {
    console.log('a user connected');
    const newConnection = new PlayerClient(idPool, socket, 0);
    idPool++;
    if (connectedUsers.length >= 1) {
        for (let i = 0; i < connectedUsers.length; i++) {
            const previousUser = connectedUsers[i];
            if (!previousUser.getPartner()) {
                previousUser.setPartner(newConnection);
                newConnection.setPartner(previousUser);
                break;
            }
        }
    }
    connectedUsers.push(newConnection);


    socket.on('disconnect', () => {
        console.log('a user disconnected');
        // Remove from array
        for (let i = 0; i < connectedUsers.length; i++) {
            if (connectedUsers[i].id == newConnection.id) {
                connectedUsers.splice(i, 1);
                break;
            }
        }
        const partner = newConnection.getPartner();
        if (partner) {
            partner.setPartner(null);
        }
        newConnection.setPartner(null);
    });
    socket.on('ping', (arg) => {
        console.log('Received ping: ' + String(arg));

        socket.emit('pong', 'hi!');
    });
    socket.on('sync', (data) => {
        newConnection.setData(data);
        const partner = newConnection.getPartner();

        if (partner) {
            partner.socket.emit('sync', data);
        }
    })
});

server.listen(PORT, () => {
    console.log('listening on port: ' + String(PORT));
});