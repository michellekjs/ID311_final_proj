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

        // this.button.addImage(preloadedImages.map.button);
        // this.pit.addImage(preloadedImages.map.horizontal_wall2);
    }

    ispressed(player) {
        player.collide(this.button);
        if ((player.touching.bottom) && (this.bx - this.bw < player.position.x) && (player.position.x < this.bx + this.bw)) {
            if (this.button.height != 20 || this.button.position.y != this.by + 15) {
                this.markDirty();
            }
            this.button.height = 20;
            this.button.position.y = this.by + 15;
            if (this.dir == "v") {
                if ((this.dist > 0 && (this.pit.position.y > this.py - this.dist)) || (this.dist < 0 && (this.pit.position.y < this.py - this.dist))) {
                    this.pit.position.y = this.pit.position.y + (this.dist > 0 ? (-1 * (deltaTime / 20)) : (1 * (deltaTime / 20)));
                    this.markDirty();
                }
            } else if (this.dir == "h") {
                if ((this.dist > 0 && (this.pit.position.x > this.px - this.dist)) || (this.dist < 0 && (this.pit.position.x < this.px - this.dist))) {
                    this.pit.position.x = this.pit.position.x + (this.dist > 0 ? (-1 * (deltaTime / 20)) : (1 * (deltaTime / 20)));
                    this.markDirty();
                }
            }

            this.dt = 0;
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