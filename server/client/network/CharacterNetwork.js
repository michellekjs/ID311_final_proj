class CharacterNetwork {
    constructor(tag) {
        this.tag = tag
        this.posX = 0;
        this.posY = 0;
        this.nowGrab = false;
        this.direction = 'right';
        if (tag == 'partner') {
            const gameClient = GameClient.getInstance();
            const self = this;

            gameClient.addRPC('ingame-sync', (params) => {
                self.sync(self, params);
            });
        }
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
        this.update();
    }

    setGrab(nowGrab) {
        this.nowGrab = nowGrab;
        this.update();
    }

    setDirection(direction) {
        this.direction = direction;
        this.update();
    }

    update() {
        const gameClient = GameClient.getInstance();
        const syncData = {
            posX: this.posX,
            posY: this.posY,
            nowGrab: this.nowGrab,
            direction: this.direction
        };
        gameClient.sendMessage('ingame-sync', syncData);
    }

    sync(self, syncData) {
        self.posX = syncData.posX;
        self.posY = syncData.posY;
        self.nowGrab = syncData.nowGrab;
        self.direction = syncData.direction;
    }
}