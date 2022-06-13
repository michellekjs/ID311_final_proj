class CharacterNetwork {
    constructor(tag) {
        this.tag = tag
        this.posX = 0;
        this.posY = 0;
        this.nowGrab = false;
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

    update() {
        const gameClient = GameClient.getInstance();
        const syncData = {
            posX: this.posX,
            posY: this.posY,
            nowGrab: this.nowGrab
        };
        gameClient.sendMessage('ingame-sync', syncData);
    }

    sync(self, syncData) {
        self.posX = syncData.posX;
        self.posY = syncData.posY;
        self.nowGrab = syncData.nowGrab;
    }
}