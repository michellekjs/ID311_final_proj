const OUTGAME_INPUT = {
    SET_PRIVATE: 0,
    READY: 1,
    SWAP: 2,
}

const PLAYER_ROLE = {
    NONE: 0,
    BIG: 1,
    SMALL: 2
};

const SOCKET_TYPE = {
    NONE: 0,
    OUTGAME: 1,
    INGAME: 2
}

class Room {
    constructor(max) {
        this.players = [];
        this.count = 0;
        this.max = max;
        this.isPrivate = false;
        this.host = null;
    }
    setHost(host) {
        this.host = host;
    }
    addPlayer(playerConnection) {
        if (this.count >= this.max) {
            return false;
        }
        this.players.push(playerConnection);
        this.count++;

        playerConnection.setRoom(this);

        if (this.host == null) {
            this.setHost(playerConnection);
        }
        return true;
    }
    removePlayer(targetConnection) {
        const nickname = targetConnection.nickname;
        for (let i = 0; i < this.count; i++) {
            if (this.players[i].nickname == nickname) {
                this.players[i].leaveRoom();
                this.players.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false;
    }
    isFull() {
        return this.max <= this.count;
    }
    getPlayerInfo(index) {
        if (index < this.count) {
            const target = this.players[index];
            let role = 'none';
            if (target.role == PLAYER_ROLE.BIG) {
                role = 'big';
            } else if (target.role == PLAYER_ROLE.SMALL) {
                role = small;
            }
            return {
                isEmpty: false,
                isHost: (this.host != null ? (this.host.nickname == target.nickname) : false),
                role: role,
                nickname: target.nickname,
                ready: target.ready
            };
        }
        return {
            isEmpty: true,
            isHost: false,
            role: 'none',
            nickname: '',
            ready: false
        };
    }
    spreadMessage(srcNickname, msg, args) {
        for (let i = 0; i < this.count; i++) {
            const player = this.players[i];
            if (player.nickname != srcNickname) {
                player.sendMeesage(msg, args);
            }
        }
    }
    spreadMessageAll(msg, args) {
        for (let i = 0; i < this.count; i++) {
            const player = this.players[i];
            player.sendMeesage(msg, args);
        }
    }
    setPrivate() {
        this.isPrivate = !this.isPrivate;
    }
    getPartner(myName) {
        for (let i = 0; i < this.count; i++) {
            const player = this.players[i];
            if (player.nickname != myName) {
                return player;
            }
        }
        return null;
    }

    getInfo() {
        const roomInfo = {
            isPrivate: this.isPrivate,
            player1: this.getPlayerInfo(0),
            player2: this.getPlayerInfo(1)
        };
        return roomInfo;
    }
}

class PlayerConnection {
    constructor(nickname) {
        this.nickname = nickname;
        this.playerRole = PLAYER_ROLE.NONE;
        this.room = null;
        this.ready = false;

        this.socket = null;
    }
    equals(nickname) {
        return this.nickname == nickname;
    }
    setRole(role) {
        this.playerRole = role;
    }
    swapRole() {
        if (this.playerRole == PLAYER_ROLE.BIG) {
            this.playerRole = PLAYER_ROLE.SMALL;
        } else if (this.playerRole == PLAYER_ROLE.SMALL) {
            this.playerRole = PLAYER_ROLE.BIG;
        }
    }
    setRoom(room) {
        this.room = room;
    }
    getRoom() {
        return this.room;
    }
    leaveRoom() {
        this.room = null;
    }
    isHost() {
        if (this.room == null) {
            return false;
        }
        return this.room.host == this;
    }
    pressReady() {
        this.ready = !this.ready;
    }

    setSocket(socket) {
        this.socket = socket;
    }

    removeSocket() {
        this.socket = null;
    }

    sendMeesage(msg, args) {
        if (this.socket != null) {
            this.socket.emit(msg, JSON.stringify(args));
        }
    }
    getPartner() {
        return this.room.getPartner(this.nickname);
    }
}

/*
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
}*/

class RoutePlayers {
    constructor() {
        this.connectedPlayers = [];
    }
    addPlayer(nickname) {
        const newPlayer = new PlayerConnection(nickname);
        this.connectedPlayers.push(newPlayer);
    }
    removePlayer(nickname) {
        for (let i = 0; i < this.connectedPlayers.length; i++) {
            if (this.connectedPlayers[i].equals(nickname)) {
                this.connectedPlayers.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    count() {
        return this.connectedPlayers.length;
    }
    exists(nickname) {
        for (let i = 0; i < this.connectedPlayers.length; i++) {
            if (this.connectedPlayers[i].equals(nickname)) {
                return true;
            }
        }
        return false;
    }
    getPlayer(nickname) {
        for (let i = 0; i < this.connectedPlayers.length; i++) {
            if (this.connectedPlayers[i].equals(nickname)) {
                return this.connectedPlayers[i];
            }
        }
        return null;
    }
}

class Rooms {
    constructor() {
        this.rooms = [];
    }
    createRoom() {
        const newRoom = new Room(2);
        this.rooms.push(newRoom);
        return newRoom;
    }
    getRandomRoom() {
        for (let i = 0; i < this.rooms.length; i++) {
            if ((!this.rooms[i].isFull()) && (!this.rooms[i].isPrivate)) {
                return this.rooms[i];
            }
        }
        return null;
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

const routePlayers = new RoutePlayers();
const rooms = new Rooms();

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/nickname', (req, res) => {
    res.sendFile(path.join(publicDir, 'nickname.html'));
})

app.get('/search', (req, res) => {
    const nickname = String(req.query.nickname);
    res.sendFile(path.join(publicDir, 'search.html'));
    console.log("hello! " + nickname);

    routePlayers.addPlayer(nickname);
})

app.get('/waitroom', (req, res) => {
    let room = null;
    const nickname = String(req.query.nickname);
    const random = String(req.query.random);
    const playerConnection = routePlayers.getPlayer(nickname);

    res.sendFile(path.join(publicDir, 'waitroom.html'));

    if (random == 'false') {
        const partner = String(req.query.partner);
        if (routePlayers.exists(partner)) {
            room = routePlayers.getPlayer(partner).getRoom();
        }
    } else {
        room = rooms.getRandomRoom();
    }

    if (room == null) {
        room = rooms.createRoom();
    }

    room.addPlayer(playerConnection);
    const playerPartner = playerConnection.getPartner();
    if (playerPartner != null) {
        if (playerPartner.role == PLAYER_ROLE.BIG) {
            playerConnection.setRole(PLAYER_ROLE.SMALL);
        } else if (playerPartner.role == PLAYER_ROLE.SMALL) {
            playerConnection.setRole(PLAYER_ROLE.BIG);
        }
    }
})

app.get('/game', (req, res) => {
    const nickname = String(req.query.nickname);
    res.sendFile(path.join(publicDir, 'game.html'));
})

app.use('/', express.static(publicDir));

io.on('connection', (socket) => {
    console.log('incoming socket conenction');
    // socket information
    let socketType = SOCKET_TYPE.NONE;
    let nickname = null;
    let player = null;

    // init socket information
    socket.on('init', (arg) => {
        const params = JSON.parse(arg);
        socketType = params.type;
        nickname = params.nickname;

        console.log("socket init for " + String(nickname));

        player = routePlayers.getPlayer(nickname);
        player.setSocket(socket);

        if (socketType == SOCKET_TYPE.OUTGAME) {
            const player = routePlayers.getPlayer(nickname);
            const room = player.getRoom();

            room.spreadMessageAll('outgame-sync', room.getInfo());
        }
    });

    // Outgame messages
    socket.on('outgame-input', (args) => {
        console.log('input from ' + String(nickname));
        const params = JSON.parse(args);

        const partner = player.getPartner();
        const input = params.input;
        const room = player.getRoom();

        // handle input
        switch (input) {
            case OUTGAME_INPUT.SET_PRIVATE:
                room.setPrivate();
                break;
            case OUTGAME_INPUT.READY:
                player.pressReady();
                if (partner != null) {
                    if (partner.ready) {
                        room.spreadMessageAll('outgame-start', room.getInfo());
                    }
                }
                break;
            case OUTGAME_INPUT.SWAP:
                player.swapRole();
                if (partner != null) {
                    partner.swapRole();
                }
                break;
        }

        room.spreadMessageAll('outgame-sync', room.getInfo());
    });

    // Ingame messages
    socket.on('ingame-sync', (args) => {
        const params = JSON.parse(args);
        const room = player.getRoom();

        if (room == null) {
            return;
        }

        room.spreadMessage(nickname, 'ingame-sync', params);
    })

    socket.on('disconnect', () => {
        player.removeSocket();
    });
});

server.listen(PORT, () => {
    console.log('listening on port: ' + String(PORT));
});