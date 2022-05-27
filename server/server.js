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

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
    socket.on('ping', (arg) => {
        console.log('Received ping: ' + String(arg));

        io.emit('pong', 'hi!');
    })
});

server.listen(PORT, () => {
    console.log('listening on port: ' + String(PORT));
});