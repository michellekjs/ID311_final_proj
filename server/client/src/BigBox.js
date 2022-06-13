class BigBox extends Gimmick {
    constructor(id, bx, by, bw, bh) {
        super(id);
        this.bx = bx;
        this.by = by;
        this.bw = bw;
        this.bh = bh;

        this.box = null;
    }
    create() {
        this.box = createSprite(this.bx, this.by, this.bw, this.bh);
    }
    activate(character, wall) {
        if (character.name == 'big') {
            if (character.player.displace(this.box)) {
                this.markDirty();
            }
        }

        if (this.box.collide(wall)) {
            this.box.immovable = true;
        }
    }
    getSyncData() {
        const params = {
            boxPosX: this.box.position.x,
            boxPosY: this.box.position.y
        };
        return params;
    }
    syncRemote(params) {
        this.box.position.x = params.boxPosX;
        this.box.position.y = params.boxPosY;
    }
}