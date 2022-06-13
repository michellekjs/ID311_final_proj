class Tunnel extends Gimmick {
    constructor(id, bx, by, bw, bh) {
        super(id);
        this.tunnel = null;
        this.afterbutton = null;
        this.beforebutton = null;
        this.bx = bx;
        this.by = by;
        this.bw = bw;
        this.bh = bh;
        this.beforepressed = false;
        this.afterpressed = false;
    }

    create() {
        this.tunnel = createSprite(this.bx, this.by, this.bw, this.bh);
        this.beforebutton = createSprite(this.bx - 200, this.by - 120, 50, 20);
        this.afterbutton = createSprite(this.bx + 200, this.by - 120, 50, 20);
    }

    activate(player) {
        player.collide(this.beforebutton);
        player.collide(this.afterbutton);
        // console.log(player.position.x , this.beforebutton.position.x)
        //console.log(this.afterpressed);
        if ((player.touching.top) && (player.position.x < this.beforebutton.position.x + 100) && (player.position.x > this.beforebutton.position.x - 100)) {
            this.beforebutton.height = 10;
            this.beforepressed = true;
            this.markDirty();
        } else if ((player.touching.top)) {
            this.afterbutton.height = 10;
            this.afterpressed = true;
            this.markDirty();
        }


        if (this.beforepressed) {
            if (this.tunnel.position.y > this.by - 300) {
                this.tunnel.position.y = this.tunnel.position.y - 1 * (deltaTime / 10);
                this.markDirty();
            }
        }

        if (this.afterpressed) {
            console.log("pressed")
            this.tunnel.remove();
        }
    }
    getSyncData() {
        const params = {
            beforebuttonHeight: this.beforebutton.height,
            beforebuttonPressed: this.beforepressed,
            afterbuttonHeight: this.afterbutton.height,
            afterbuttonPressed: this.afterpressed
        };
        return params;
    }
    syncRemote(params) {
        this.beforebutton.height = params.beforebuttonHeight;
        this.beforepressed = params.beforebuttonPressed;
        this.afterbutton.height = params.afterbuttonHeight;
        this.afterpressed = params.afterbuttonPressed;
    }
}