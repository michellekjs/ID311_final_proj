let myChar;
let partnerChar;

setup = function() {
    createCanvas(800, 600);
    const gameClient = GameClient.getInstance();
    gameClient.connect();

    myChar = new CharacterNetwork('me');
    partnerChar = new CharacterNetwork('partner');
}

draw = function() {
    background(100);
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    rect(mouseX, mouseY, 50, 50);
    myChar.setPosition(mouseX, mouseY);
    fill(0, 255, 0);
    rect(partnerChar.posX, partnerChar.posY, 50, 50);
}