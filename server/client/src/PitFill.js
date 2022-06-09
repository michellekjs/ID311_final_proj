class PitFill{
  constructor(bx, by,bw, bh, px, py,  pw, ph, dir, dist) {
    this.button = null; // 
    this.pit = null;
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
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
    if ((player.touching.bottom)&&(this.bx-this.bw < player.position.x ) && (player.position.x< this.bx+this.bw)) {
      this.button.height = 20;
      this.button.position.y = this.by+15;
      if (this.dir == "v") {
        console.log("Vertical movement")
        this.pit.position.y = this.py - this.dist;
      }
      else if (this.dir == "h") {
        console.log("Horizontal movement")
        this.pit.position.x = this.px - this.dist;
      }
      
    }
  }
}
