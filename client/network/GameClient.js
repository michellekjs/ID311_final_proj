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
        const io = require('socket.io-client')

        const client = io.connect('http://3.35.10.195:3001/');

        client.on('connect', (msg) => {
            console.log('GameClient ready');
            gameClient.ready = true;
        })

        this.client = client;
    }
    sendMessage(tag, arg) {
        if (!this.ready) {
            return false;
        }
        const client = this.client;

        client.emit(tag, arg);
        return true;
    }
    addRPC(tag, func) {
        const client = this.client;

        client.on(tag, func);
    }
}

export { GameClient };