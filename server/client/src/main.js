let myChar;
let partnerChar;
let gameMap;
const wallD=50;
setup = function() {
    createCanvas(800, 600);
    const gameClient = GameClient.getInstance();
    gameClient.connect();
    myChar = new CharacterNetwork('me');
    partnerChar = new CharacterNetwork('partner');
    createMap();
}

draw = function() { 
    background(100);
    drawMap();
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    myChar.player.collide(gameMap);
    partnerChar.player.collide(gameMap);
    myChar.player.collide(partnerChar.player);
    myChar.checkJump();
    camera.position.x = myChar.player.position.x;
	camera.position.y = myChar.player.position.y;
    // rect(myChar.posX, myChar.posY, myChar.width, myChar.height);
    myChar.drawPlayer();
    partnerChar.drawPlayer();
    myChar.playerMove();
    // myChar.setPosition(myChar.posX, myChar.posY);
    myChar.setPosition();
    fill(0, 255, 0);
    // rect(partnerChar.posX, partnerChar.posY, 50, 50);
}

createMap = function(){
    gameMap = new Group();
    bottomWall = createSprite(width/2, height, width, wallD);
	bottomWall.immovable = true;
    bottomWall.debug=true;
    topWall = createSprite(width/2, 0, width, wallD);
	topWall.immovable = true;
    topWall.debug=true;
    leftWall = createSprite(0, height/2, wallD, height);
	leftWall.immovable = true;
    leftWall.debug=true;
    rightWall = createSprite(width, height/2, wallD, height);
	rightWall.immovable = true;
    rightWall.debug=true;

    block1 = createSprite(width/1.5, height/1.5, width/2, wallD);
	block1.immovable = true;
    block1.debug=true;
    gameMap.add(bottomWall);
    gameMap.add(topWall);
    gameMap.add(leftWall);
    gameMap.add(rightWall);
    gameMap.add(block1);
}

drawMap = function(){
    drawSprites(gameMap);
}