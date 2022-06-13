class PitFill extends Gimmick {
    constructor(id, bx, by, bw, bh, px, py, pw, ph, dir, dist) {
        super(id);

        this.button = null; // 
        this.pit = null;
        this.bx = bx;
        this.by = by;
        this.bw = 100;
        this.bh = 50;
        this.px = px;
        this.py = py;
        this.pw = pw;
        this.ph = ph;
        this.dir = dir;
        this.dist = dist;
    }

    create() {
        this.button = createSprite(this.bx, this.by, this.bw, this.bh);
        this.pit = createSprite(this.px, this.py, this.pw, this.ph);
    }

    ispressed(player) {
        player.collide(this.button);
        if ((player.touching.bottom) && (this.bx - this.bw < player.position.x) && (player.position.x < this.bx + this.bw)) {
            this.button.height = 20;
            this.button.position.y = this.by + 15;
            if (this.dir == "v") {
                if (this.pit.position.y > height + 50) {
                    this.pit.position.y = this.pit.position.y - 1 * (deltaTime / 20);
                }
            } else if (this.dir == "h") {
                this.pit.position.x = this.px - this.dist;
            }
            this.markDirty();
        } else {
            // this.button.height = this.bh;
            // this.button.position.y = this.by+15;
        }
    }

    getSyncData() {
        const params = {
            buttonHeight: this.button.height,
            buttonPosY: this.button.position.y,
            pitPosY: this.pit.position.y,
            pitPosX: this.pit.position.x
        };
        return params;
    }
    syncRemote(params) {
        this.button.height = params.buttonHeight;
        this.button.position.y = params.buttonPosY;
        this.pit.position.y = params.pitPosY;
        this.pit.position.x = params.pitPosX;
    }
}