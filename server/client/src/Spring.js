class Spring {
    constructor(bx, by, bw, bh, f) {
        this.bx = bx;
        this.by = by;
        this.bw = bw;
        this.bh = bh;
        this.f = f;
        this.box = null;
    }

    create() {
        this.box = createSprite(this.bx, this.by, this.bw, this.bh);
    }

    activate(player) {
        if (player.overlap(this.box)) {
            player.setSpeed(this.f, -120);
        }
    }
}