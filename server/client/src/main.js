let myChar;
let partnerChar;
let gameMap;
let playerGroup;
let grabCase = false;
const wallD = 100;
let pitFill, pitFill2, buttonDoor, gameEnd, tunnel, spring;
let elapsedTime = 0;

setup = function() {
    const windowWidth = 1600;
    const windowHeight = 1200;
    createCanvas(windowWidth, windowHeight);
    const gameClient = GameClient.getInstance();
    gameClient.connect();
    setInterval(updateTime, 500);

    //create pitfill sprite
    pitFill = new PitFill('pitfill-1', width + 900, height - 25, 50, 50, width + width / 4, height + 300, width / 2, wallD, "v", 250);
    pitFill.create();

    pitFill2 = new PitFill('pitfill-2', width * 3 + 900, height - 650, 100, 50, width * 3 + 100, height - 500, 200, 50, 'v', -200);
    pitFill2.create();

    //tunnel
    tunnel = new Tunnel('tunnel-1', width + 1400, height - 600, 200, 1200, 110);
    tunnel.create();

    //pushing  box
    bigbox = new BigBox('bigbox-1', width * 2 + 500, height - 100, 200, 200);
    bigbox.create();
    //after box in-air step & button
    airstep2 = createSprite(width * 3 + 300, height - 500, 200, 50);
    airplane = createSprite(width * 4, height - 600, width, 50);



    //button click and entrance appears
    // buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
    // buttonDoor.create();

    //Spring 
    spring = new Spring(width * 4, height - 650, 100, 50, 45);
    spring.create();

    // read session data
    const roomInfo = JSON.parse(sessionStorage.getItem('room-info'));
    const nickname = sessionStorage.getItem('nickname');

    let myCharInfo;
    let partnerCharInfo;

    if (roomInfo.player1.nickname == nickname) {
        myCharInfo = roomInfo.player1;
        partnerCharInfo = roomInfo.player2;
    } else {
        myCharInfo = roomInfo.player2;
        partnerCharInfo = roomInfo.player1;
    }

    //initiate players
    playerGroup = new Group();
    myChar = new Character('me', myCharInfo.role);
    partnerChar = new Character('partner', partnerCharInfo.role);
    playerGroup.add(myChar.player);
    playerGroup.add(partnerChar.player);
    //game end sprite initialize
    // gameEnd = new GameEnd(width + 500, height-50);
    // gameEnd.create();

    //map initiating
    createMap();
}

draw = function() {
    background(100);
    drawMap();
    fill(255);
    textSize(50)
    text(elapsedTime, camera.position.x + 300, myChar.player.position.y - 350);

    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    camera.position.x = myChar.player.position.x;
    camera.position.y = myChar.player.position.y - height / 2 + 300;
    //score (time) counting


    //pitfill rendering 
    pitFill.ispressed(myChar.player);
    pitFill2.ispressed(myChar.player);
    //buttondoor rendering 
    // buttonDoor.ispressed(myChar.player);
    //gameend button activated
    // gameEnd.activate(myChar.player);
    //spring
    spring.activate(myChar.player);
    //tunnel
    tunnel.activate(myChar.player);

    bigbox.activate(myChar, bottomWall3, gameMap);

    //player fall
    if (myChar.player.position.y > height + 100) {
        myChar.restart();
    }

    //player movement
    playerGroup.collide(gameMap);
    if (!myChar.nowGrab) {
        myChar.player.collide(partnerChar.player);
    } else if (myChar.nowGrab) {
        myChar.player.overlap(partnerChar.player);
    }
    myChar.checkJump(partnerChar);
    partnerChar.checkJump(myChar);
    myChar.checkGrab(partnerChar); //myChar가 작은 팽귄
    partnerChar.checkGrab(myChar);

    myChar.drawPlayer();
    partnerChar.drawPlayer();

    myChar.playerMove(partnerChar);

    myChar.update();

    const prevNowGrab = partnerChar.nowGrab;
    partnerChar.syncPosition();

    if (prevNowGrab && partnerChar.name == 'big') {
        if (!partnerChar.nowGrab) {
            if (partnerChar.direction == 'left') {
                myChar.player.setSpeed(30, -135);
            } else {
                myChar.player.setSpeed(30, -45);
            }
        }
    }

    fill(0, 255, 0);

    const gimmickManager = GimmickManager.getInstance();
    gimmickManager.update();
}

createMap = function() {
    gameMap = new Group();
    bottomWall = createSprite(width / 2, height + 50, width, wallD);
    bottomWall.immovable = true;
    bottomWall.debug = true;

    console.log(bottomWall);

    bottomWall2 = createSprite(width * 2 + width / 4, height + 50, width * 3 / 2, wallD);
    bottomWall2.immovable = true;
    bottomWall2.debug = true;

    bottomWall3 = createSprite(width * 2 + width, height, 100, wallD);
    bottomWall3.immovable = true;
    bottomWall3.debug = true;

    leftWall = createSprite(0, height / 2, wallD, height);
    leftWall.immovable = true;
    leftWall.debug = true;
    rightWall = createSprite(width * 2, height / 2, wallD, height);
    rightWall.immovable = true;
    rightWall.debug = true;

    block1 = createSprite(width / 1.5, height / 1.5, width / 2, wallD);
    block1.immovable = true;
    block1.debug = true;

    //add pitfill to the gamemap
    gameMap.add(pitFill.button);
    gameMap.add(pitFill.pit);
    gameMap.add(pitFill2.button);
    gameMap.add(pitFill2.pit);
    // gameMap.add(buttonDoor.box);
    // gameMap.add(buttonDoor.cliff);
    // gameMap.add(buttonDoor.cliff2);
    // gameMap.add(buttonDoor.button);
    gameMap.add(spring.box);
    gameMap.add(tunnel.tunnel);
    gameMap.add(tunnel.beforebutton);
    gameMap.add(tunnel.afterbutton);

    // gameMap.add(gameEnd.end);
    gameMap.add(bottomWall);
    gameMap.add(bottomWall2);
    gameMap.add(bottomWall3);
    gameMap.add(bigbox.box);
    gameMap.add(leftWall);
    gameMap.add(airstep2);
    gameMap.add(airplane);
    // gameMap.add(rightWall);
}

function keyPressed() {
    if (keyCode == 38) { //uparrow
        console.log("uparrow");
        myChar.jump(partnerChar);
    } else if (keyCode == 71) { //g
        console.log("g");
        /*if (grabCase) {
            if (partnerChar.player.deltaX < 0) {
                partnerChar.player.setSpeed(30, -135);
            } else {
                partnerChar.player.setSpeed(30, -45);
            }
        }*/
        grabCase = myChar.grab(partnerChar.player.position);
    } else if (keyCode == 80) {
        console.log("p");
    }
}

drawMap = function() {
    drawSprites(gameMap);
}

updateTime = function() {
    elapsedTime = elapsedTime + 1
}