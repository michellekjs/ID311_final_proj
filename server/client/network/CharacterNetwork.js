class CharacterNetwork {
    constructor(tag) {
        this.tag = tag
        this.height = 70;
        this.width = 50;
        this.posX = width/2;
        this.posY = 0;
        this.vX=0;
        this.vY=0;
        this.gravity=0.3;
        this.jumping=true;
        this.player = createSprite(this.posX, this.posY, this.width, this.height);
        this.player.debug=true;
        this.player.friction = 0.01;
        this.player.maxSpeed = 15;

        if (tag == 'partner') {
            const gameClient = GameClient.getInstance();
            const self = this;

            gameClient.addRPC('sync', (arg) => {
                self.sync(self, arg);
            });
        }
    }
    drawPlayer(){
        if(this.jumping){
            this.player.velocity.y += this.gravity;
        }else{
            this.player.velocity.y=0;
        }
        drawSprite(this.player);
    }

    setPosition() {
        this.posX = this.player.position.x;
        this.posY = this.player.position.y;
        this.update();
    }

    checkJump(){
        if(myChar.player.touching.bottom){
            this.jumping = false;
        }else{
            this.jumping = true;
        }
    }

    playerMove(){
        if (keyIsDown(RIGHT_ARROW)) {
            this.player.addSpeed(0.2,0);
            this.posX+=5;
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.player.addSpeed(0.2,270);
            this.posY+=5;
        }
        else if (keyIsDown(LEFT_ARROW)) {
            this.player.addSpeed(0.2,180);
            this.posX-=5;
        }
        else if (keyIsDown(UP_ARROW)) {
            if(this.jumping==false){
                console.log("jump");
                this.player.velocity.y=-15;
                // this.jumping=true;
            }
        }
        this.update();
    }


    update() {
        const gameClient = GameClient.getInstance();
        // const syncData = {
        //     posX: this.posX,
        //     posY: this.posY
        // };
        const syncData = {
            posX: this.player.position.x,
            posY: this.player.position.y
        };
        gameClient.sendMessage('sync', JSON.stringify(syncData));
    }

    sync(self, arg) {
        const syncData = JSON.parse(arg);
        self.posX = syncData.posX;
        self.posY = syncData.posY;
    }
}