class GameEnd{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.end = null;
    // this.player = player;
  }
  
  create(){
    this.end = createSprite(this.x, this.y , 20, 20);
  }

  activate(player) {
    if (player.overlap(this.end)) {
      window.location.href = "../gameover.html"
    }
  }

}
