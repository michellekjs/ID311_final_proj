class CharacterNetwork {
    constructor(tag) {
        this.tag = tag
        this.posX = 0;
        this.posY = 0;
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

    update() {
        const gameClient = GameClient.getInstance();
        const syncData = {
            posX: this.posX,
            posY: this.posY
        };
        gameClient.sendMessage('ingame-sync', syncData);
    }

    sync(self, syncData) {
        self.posX = syncData.posX;
        self.posY = syncData.posY;
    }
}