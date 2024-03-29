class GameClient {
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameClient();
        }
        return this.instance;
    }
    constructor() {
        this.ready = false;
        this.client = null;
    }
    connect() {
        const gameClient = this;
        //const io = require('socket.io-client')

        const client = io();

        client.on('connect', (msg) => {
            console.log('GameClient ready');
            gameClient.ready = true;
            gameClient.sendMessage('init', {
                type: SOCKET_TYPE.INGAME,
                nickname: sessionStorage.getItem('nickname')
            });
        })

        this.client = client;
    }
    sendMessage(tag, arg) {
        if (!this.ready) {
            return false;
        }
        const client = this.client;

        client.emit(tag, JSON.stringify(arg));
        return true;
    }
    addRPC(tag, func) {
        const client = this.client;

        client.on(tag, (args) => {
            func(JSON.parse(args));
        });
    }
}