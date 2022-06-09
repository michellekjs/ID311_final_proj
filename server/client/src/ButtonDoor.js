class ButtonDoor{
  constructor(bx, by,bw, bh, px, py,  pw, ph) {
    this.box = null; // pushed by the player
    this.cliff = null; // 
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
    this.cx = cx;
    this.cy = cy; 
    this.cw = cw;
    this.ch = ch; 
  }

  create() {
    this.box = createSprite(this.bx, this.by, this.bw, this.bh);
    this.cliff = createSprite(this.cx, this.cy, this.cw, this.ch);
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
