class Character {
    constructor(tag, name) {
        this.tag = tag
        if (name == "small") {
            this.height = 100;
        } else {
            this.height = 200;
        }
        this.width = 100;
        this.vX = 0;
        this.vY = 0;
        this.gravity = 0.3;
        this.jumping = true;
        if (name == "small") {
            this.secondJump = false;
        }
        this.nowGrab = false;
        this.player = createSprite(width / 2 + (name == 'small' ? 50 : (-50)), 100, this.width, this.height);
        this.player.debug = true;
        this.player.friction = 0.01;
        this.player.maxSpeed = 60;
        this.name = name;

        this.network = new CharacterNetwork(tag);

        this.direction = 'right';
        this.keyPressed = false;

        this.dt = 0;
        this.spriteDuration = 125;
        this.spriteNum = 0;

        this.initAnimation();
    }
    initAnimation() {
        if (this.name == 'big') {
            this.addImages('default', preloadedImages.penguin2.standing);
            this.addImages('holding', preloadedImages.penguin2.holding);
            this.addImages('falling', preloadedImages.penguin2.holding);
            this.addImages('walking', preloadedImages.penguin2.walking);
        } else {
            this.addImages('default', preloadedImages.penguin1.standing);
            this.addImages('holding', preloadedImages.penguin1.falling);
            this.addImages('falling', preloadedImages.penguin1.falling);
            this.addImages('walking', preloadedImages.penguin1.walking);
        }
    }
    updateAnimation() {
        let state = 'default';
        this.dt += deltaTime;

        if (this.keyPressed) {
            state = 'walking';
        }

        if (this.name == 'big' && this.nowGrab) {
            state = 'holding';
        }

        if (this.name == 'small' && this.jumping) {
            state = 'falling';
        }

        if (this.dt > this.spriteDuration) {
            this.dt -= this.spriteDuration;
            const cnt = this.getSpriteCount(state);
            this.spriteNum = (this.spriteNum + 1) % cnt;

            this.player.changeImage(state + '-' + String(this.spriteNum));
        }
        this.player.mirrorX(this.direction == 'left' ? -1 : 1);
    }
    getSpriteCount(state) {
        if (this.name == 'big') {
            switch (state) {
                case 'default':
                    return 1;
                case 'holding':
                    return 4;
                case 'falling':
                    return 4;
                case 'walking':
                    return 4;
            }
        } else {
            switch (state) {
                case 'default':
                    return 1;
                case 'holding':
                    return 1;
                case 'falling':
                    return 1;
                case 'walking':
                    return 4;
            }
        }
    }
    addImages(label, images) {
        const player = this.player;
        for (let i = 0; i < images.length; i++) {
            player.addImage(label + '-' + String(i), images[i]);
        }
    }
    restart() {
        this.player.position.x = width / 2 + (this.name == 'small' ? 50 : (-50));
        this.player.position.y = 100;
    }
    drawPlayer() {
        if (this.jumping) {
            // console.log("jumping");
            this.player.velocity.y += this.gravity;
        } else if (!this.jumping) {
            // this.player.velocity.y = 0;
        }
        // console.log("vy = "+this.player.velocity.y);
        this.updateAnimation();
        drawSprite(this.player);
    }

    checkJump(partner) {
        if (partner.nowGrab && this.name == 'small') {
            this.jumping = true;
            this.network.setJumping(this.jumping);
            return;
        }
        // console.log(this.player.touching.bottom);
        if (this.player.touching.bottom) {
            this.jumping = false;
            this.network.setJumping(this.jumping);
            if (this.name == "small") {
                this.secondJump = false;
            }
            // console.log("checking ground")
        } else if (!this.player.touching.bottom) {
            this.jumping = true;
            this.network.setJumping(this.jumping);
            // console.log("checking jumping")
        }
    }

    jump(partner) {
        if (partner.nowGrab && this.name == 'small') {
            return;
        }
        if (!this.jumping) {
            console.log("jump");
            this.player.velocity.y = -15;
        } else if (this.name == "small") {
            console.log(this.secondJump);
            if (!this.secondJump) {
                this.player.velocity.y = -12;
                this.secondJump = true;
            }
        }
    }
    playerMove(partner) {
        const prevSpeed = this.player.getSpeed();
        const prevDirection = this.player.getDirection();
        const v_x = prevSpeed * Math.cos(prevDirection / 180 * Math.PI);
        const v_y = prevSpeed * Math.sin(prevDirection / 180 * Math.PI);

        let result_x = v_x;
        let result_direction;

        this.keyPressed = false;

        if (partner.nowGrab) {
            return;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            result_x += 0.2;
            this.direction = 'right';
            this.network.setDirection('right');
            this.keyPressed = true;
        }
        // else if (keyIsDown(DOWN_ARROW)) {
        //     this.player.addSpeed(0.2, 270);
        //     console.log(this.player.velocity)
        // }
        else if (keyIsDown(LEFT_ARROW)) {
            result_x -= 0.2;
            this.direction = 'left';
            this.network.setDirection('left');
            this.keyPressed = true;
        }
        // else if (keyIsDown(UP_ARROW)) {
        //     if (!this.jumping) {
        //         console.log("jump");
        //         this.player.velocity.y = -8;
        //         // this.jumping = true;
        //         // console.log(this.player.velocity);
        //     }
        //     else if(this.name == "small"){
        //         console.log(this.secondJump);
        //         if(!this.secondJump){
        //             this.player.velocity.y = -8;
        //             this.secondJump = true;
        //         }
        //     }
        // }
        if (this.keyPressed) {
            if (result_x > 5) {
                result_x = 5;
            }
            if (result_x < -5) {
                result_x = -5;
            }

            if (result_x == 0) {
                if (v_y > 0) {
                    result_direction = 90;
                } else {
                    result_direction = -90;
                }
            } else if (result_x > 0) {
                result_direction = Math.atan(v_y / result_x) / Math.PI * 180;
            } else {
                result_direction = Math.atan(v_y / result_x) / Math.PI * 180 + 180;
            }

            this.player.setSpeed(
                Math.sqrt(result_x * result_x + v_y * v_y),
                result_direction
            );
        }
        this.network.setKeyPressed(this.keyPressed);
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
        this.nowGrab = network.nowGrab;
        this.direction = network.direction;
        this.keyPressed = network.keyPressed;
        this.jumping = network.jumping;
    }

    fly(partner) {
        if (!partner.nowGrab) {
            this.player.setVelocity(15, 30);
        }
    }
    grab(partnerPos) {
        const network = this.network;
        if (this.name == "big") {
            if (!this.nowGrab) {
                if (dist(this.player.position.x, this.player.position.y, partnerPos.x, partnerPos.y) < 120) {
                    console.log("grab");
                    this.nowGrab = true;
                    network.setGrab(this.nowGrab);
                }
            } else if (this.nowGrab) {
                this.nowGrab = false;
                network.setGrab(this.nowGrab);
            }
            return this.nowGrab;
        }
    }

    checkGrab(partner) {
        if (this.name == "small") {
            if (partner.nowGrab) {
                if (partner.direction == 'left') {
                    this.player.position.x = partner.player.position.x - 10; //겹치면 collide 문제 발생
                } else {
                    this.player.position.x = partner.player.position.x + 10;
                }
                this.player.position.y = partner.player.position.y - this.height;
                // this.jumping=false;
                // this.player.velocity.y=0;
            }
        }
    }

}