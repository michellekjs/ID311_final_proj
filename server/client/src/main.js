let myChar;
let partnerChar;
let gameMap;
let playerGroup;
let grabCase = false;
const wallD = 50;
setup = function() {
    createCanvas(800, 600);
    const gameClient = GameClient.getInstance();
    gameClient.connect();
    playerGroup = new Group();
    myChar = new Character('me',"big");
    partnerChar = new Character('partner',"small");
    playerGroup.add(myChar.player);
    playerGroup.add(partnerChar.player);
    createMap();
}

draw = function() {
    background(100);
    drawMap();
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    camera.position.x = myChar.player.position.x;
    camera.position.y = myChar.player.position.y;

    playerGroup.collide(gameMap);
    if(!myChar.nowGrab){
        myChar.player.collide(partnerChar.player);
    }else if(myChar.nowGrab){
        myChar.player.overlap(partnerChar.player);
    }
    myChar.checkJump();
    partnerChar.checkJump();

    myChar.checkGrab(partnerChar);//myChar가 작은 팽귄일 경우
    partnerChar.checkGrab(myChar);



    myChar.drawPlayer();
    partnerChar.drawPlayer();

    myChar.playerMove();
// partnerChar.playerMove();

    myChar.update();
    partnerChar.update();//local에서만 필요할듯?
    
    // console.log(partnerChar.player.velocity.y);

    partnerChar.syncPosition();//지금은 안사용

    fill(0, 255, 0);
}

createMap = function() {
    gameMap = new Group();
    bottomWall = createSprite(width, height, width*2, wallD);
    bottomWall.immovable = true;
    bottomWall.debug = true;
    topWall = createSprite(width, 0, width*2, wallD);
    topWall.immovable = true;
    topWall.debug = true;
    leftWall = createSprite(0, height / 2, wallD, height);
    leftWall.immovable = true;
    leftWall.debug = true;
    rightWall = createSprite(width*2, height / 2, wallD, height);
    rightWall.immovable = true;
    rightWall.debug = true;

    block1 = createSprite(width / 1.5, height / 1.5, width / 2, wallD);
    block1.immovable = true;
    block1.debug = true;
    gameMap.add(bottomWall);
    gameMap.add(topWall);
    gameMap.add(leftWall);
    gameMap.add(rightWall);
    // gameMap.add(block1);
}

function keyPressed() {
    if(keyCode == 38){//uparrow
        console.log("uparrow");
        myChar.jump();
    }
    else if (keyCode == 71) {//g
        console.log("g");
        if(grabCase){
            if(partnerChar.player.deltaX<0){
                partnerChar.player.setSpeed(15,-135);
            }else{
                partnerChar.player.setSpeed(15,-45);
            }
        }
        grabCase = myChar.grab(partnerChar.player.position);
    }
    else if (keyCode == 80) {
        console.log("p");
    }
}

drawMap = function() {
    drawSprites(gameMap);
}