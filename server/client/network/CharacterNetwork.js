class CharacterNetwork {
    constructor(tag) {
        this.tag = tag
        this.posX = 0;
        this.posY = 0;
        this.nowGrab = false;
        this.direction = 'right';
        this.keyPressed = false;
        this.jumping = true;
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
        const prev = this.nowGrab;
        this.nowGrab = nowGrab;
        if (prev != this.nowGrab) {
            this.update();
        }
    }

    setDirection(direction) {
        const prev = this.direction;
        this.direction = direction;
        if (prev != this.direction) {
            this.update();
        }
    }

    setJumping(jumping) {
        const prev = this.jumping;
        this.jumping = jumping;
        if (prev != this.jumping) {
            this.update();
        }
    }

    setKeyPressed(keyPressed) {
        const prev = this.keyPressed;
        this.keyPressed = keyPressed;
        if (prev != this.keyPressed) {
            this.update();
        }
    }

    update() {
        const gameClient = GameClient.getInstance();
        const syncData = {
            posX: this.posX,
            posY: this.posY,
            nowGrab: this.nowGrab,
            direction: this.direction,
            keyPressed: this.keyPressed,
            jumping: this.jumping
        };
        gameClient.sendMessage('ingame-sync', syncData);
    }

    sync(self, syncData) {
        self.posX = syncData.posX;
        self.posY = syncData.posY;
        self.nowGrab = syncData.nowGrab;
        self.direction = syncData.direction;
        self.keyPressed = syncData.keyPressed;
        self.jumping = syncData.jumping;
    }
}