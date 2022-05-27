const io = require('socket.io-client')

const client = io.connect('http://3.35.10.195:3001/');

client.on('connect', (msg) => {
    console.log('ready to start!');
    client.emit('ping', 'hello world!');
})

client.on('pong', (arg) => {
    console.log('Received pong: ' + String(arg));
})