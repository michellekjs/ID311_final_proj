class Spring{
  constructor(bx, by, f) {
    this.bx = bx;
    this.by = by;
    this.f = f;
    this.box = null;
  }

  create() {
    this.box = createSprite(this.bx, this.by, 20, 20);
  }
  
  activate(player) {
    if (player.overlap(this.box)) {
      player.setSpeed(30, -60);
    }
  }
}
