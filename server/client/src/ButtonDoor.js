class ButtonDoor{
  constructor(bx, by,bw, bh, cx, cy,  cw, ch) {
    this.box = null; // pushed by the player
    this.cliff = null; // 
    this.cliff2 =  null;
    this.button = null;
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
    this.cx = cx;
    this.cy = cy; 
    this.cw = cw;
    this.ch = ch; 
    this.buttondown = false;
  }

  create() {
    this.box = createSprite(this.bx, this.by, this.bw, this.bh);
    this.cliff = createSprite(this.cx, this.cy, this.cw, this.ch/2);
    this.cliff2 = createSprite(this.cx, this.cy - this.ch/2, this.cw, this.ch/2);
    this.button = createSprite(this.cx+20, this.cy-this.ch +50 ,50, 20);
  }
  
  // openEntrance() {
  //   this.
  // }



  ispressed(player) {
    if (-player.position.y + this.box.position.y < this.bh/2) {
      player.displace(this.box);
    }
    else {
      player.collide(this.box)
    }
    
    player.collide(this.button);
    this.box.collide(this.cliff);
    if ((player.touching.bottom)&&(this.cx + -25 < player.position.x ) && (player.position.x< this.cx+75)) {
      this.button.height = 10;
      this.buttondown  = true;
      // 버튼이 눌리면 어떤 작업을 할지 여기에 작성
      if (this.cy - this.ch/2 -100 < this.cliff2.position.y){
        this.cliff2.position.y = this.cliff2.position.y - 1 * (deltaTime / 20);
      }
      if (this.cy - this.ch/2 -150 < this.cliff2.position.y){
        this.cliff2.position.y = this.cliff2.position.y - 1 * (deltaTime / 20);
        this.button.position.y = this.cliff2.position.y -this.ch/2 + 50
      }
  
    }
    else {
      this.button.height = 20;
      this.buttondown = false;
    }
  }
}
