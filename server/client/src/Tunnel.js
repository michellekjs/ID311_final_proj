class Tunnel{
  constructor(bx, by,bw,bh) {
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
    this.beforebutton = createSprite(this.bx -200, this.by-120, 50, 20);
    this.afterbutton = createSprite(this.bx +200, this.by-120, 50, 20);
  }
  
  activate(player) {
    player.collide(this.beforebutton);
    player.collide(this.afterbutton);
    // console.log(player.position.x , this.beforebutton.position.x)
    console.log(this.afterpressed);
    if ((player.touching.top) && (player.position.x < this.beforebutton.position.x + 100)&& (player.position.x > this.beforebutton.position.x -100)) {
      this.beforebutton.height = 10;
      this.beforepressed = true;
    }
    else if ((player.touching.top)) {
      this.afterbutton.height = 10;
      this.afterpressed = true;
    }


    if (this.beforepressed) {
      if (this.tunnel.position.y > this.by-300){
        this.tunnel.position.y = this.tunnel.position.y - 1 * (deltaTime / 10);
      }
    }

    if (this.afterpressed) {
      console.log("pressed")
      this.tunnel.remove();
    }
  }
}
