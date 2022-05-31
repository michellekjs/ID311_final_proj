class Character {
    constructor(tag) {
        this.tag = tag
        this.height = 70;
        this.width = 50;
        this.vX = 0;
        this.vY = 0;
        this.gravity = 0.3;
        this.jumping = true;
        this.player = createSprite(width / 2, 0, this.width, this.height);
        this.player.debug = true;
        this.player.friction = 0.01;
        this.player.maxSpeed = 15;

        this.network = new CharacterNetwork(tag);
    }
    drawPlayer() {
        if (this.jumping) {
            this.player.velocity.y += this.gravity;
        } else {
            this.player.velocity.y = 0;
        }
        drawSprite(this.player);
    }

    checkJump() {
        if (myChar.player.touching.bottom) {
            this.jumping = false;
        } else {
            this.jumping = true;
        }
    }

    playerMove() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.player.addSpeed(0.2, 0);
        } else if (keyIsDown(DOWN_ARROW)) {
            this.player.addSpeed(0.2, 270);
        } else if (keyIsDown(LEFT_ARROW)) {
            this.player.addSpeed(0.2, 180);
        } else if (keyIsDown(UP_ARROW)) {
            if (this.jumping == false) {
                console.log("jump");
                this.player.velocity.y = -15;
                // this.jumping=true;
            }
        }
        this.update();
    }


    update() {
        const network = this.network;
        network.setPosition(this.player.position.x, this.player.position.y);
    }

    syncPosition() {
        const network = this.network;
        this.player.position.x = network.posX;
        this.player.position.y = network.posY;
    }
}