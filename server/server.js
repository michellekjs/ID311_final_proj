class PlayerClient {
    constructor(id, socket, state) {
        this.id = id;
        this.socket = socket;
        this.state = state;
        this.partner = null;
        this.data = '';
    }
    getPartner() {
        return this.partner;
    }
    setPartner(partner) {
        this.partner = partner;
    }
    setData(data) {
        this.data = data;
    }
}

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const path = require('path');
const publicDir = path.join(__dirname, 'client');

const PORT = 3001;

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/', express.static(publicDir));

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