class WaitRoomClient {
    static getInstance() {
        if (!this.instance) {
            this.instance = new WaitRoomClient();
        }
        return this.instance;
    }
    constructor() {
        this.ready = false;
        this.client = null;
    }
    connect() {
        const roomClient = this;

        const client = io();

        client.on('connect', (msg) => {
            console.log('RoomClient ready');
            roomClient.ready = true;
            roomClient.sendMessage('init', {
                type: SOCKET_TYPE.OUTGAME,
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

        client.on(tag, func);
    }
}