let myChar;
let partnerChar;
let gameMap;
let playerGroup;
let grabCase = false;
const wallD = 100;
let pitFill, pitFill2, buttonDoor, gameEnd, tunnel, spring;
let elapsedTime = 0;

const preloadedImages = {
    background: {},
    egg: {
        standing: []
    },
    map: {},
    penguin1: {
        standing: [],
        falling: [],
        walking: []
    },
    penguin2: {
        standing: [],
        holding: [],
        walking: []
    }
};

function preload() {
    preloadedImages.background.day = loadImage('./image/background/Map_day.jpg');
    preloadedImages.background.night = loadImage('./image/background/Map_night.jpg');

    preloadedImages.egg.standing[0] = loadImage('./image/egg/egg1.png');
    preloadedImages.egg.standing[1] = loadImage('./image/egg/egg2.png');
    preloadedImages.egg.standing[2] = loadImage('./image/egg/egg3.png');
    preloadedImages.egg.standing[3] = loadImage('./image/egg/egg4.png');
    preloadedImages.egg.standing[4] = loadImage('./image/egg/egg5.png');

    /*preloadedImages.map.button = loadImage('./image/map/button.png');
    preloadedImages.map.horizontal_wall1 = loadImage('./image/map/horizontal_wall1.png');
    preloadedImages.map.horizontal_wall2 = loadImage('./image/map/horizontal_wall2.png');
    preloadedImages.map.horizontal_wall3 = loadImage('./image/map/horizontal_wall3.png');
    preloadedImages.map.igloo = loadImage('./image/map/igloo.png');
    preloadedImages.map.trap = loadImage('./image/map/trap.png');
    preloadedImages.map.vertical_wall = loadImage('./image/map/vertical_wall.png');*/

    preloadedImages.map.airplane = loadImage('./image/additionalmap/airplane.png');
    preloadedImages.map.airstep2 = loadImage('./image/additionalmap/airstep2.png');
    preloadedImages.map.block1 = loadImage('./image/additionalmap/block1.png');
    preloadedImages.map.bottomWall = loadImage('./image/additionalmap/bottomWall.png');
    preloadedImages.map.bottomWall2 = loadImage('./image/additionalmap/bottomWall2.png');
    preloadedImages.map.bottomWall3 = loadImage('./image/additionalmap/bottomWall3.png');
    preloadedImages.map.box = loadImage('./image/additionalmap/box.png');
    preloadedImages.map.button = loadImage('./image/additionalmap/button.png');
    preloadedImages.map.button2 = loadImage('./image/additionalmap/button2.png');
    preloadedImages.map.flyingWall = loadImage('./image/additionalmap/flyingWall.png');
    preloadedImages.map.pitFill2_block = loadImage('./image/additionalmap/pitFill2_block.png');
    preloadedImages.map.spring = loadImage('./image/additionalmap/spring.png');
    preloadedImages.map.tunnel_afterbutton = loadImage('./image/additionalmap/tunnel_afterbutton.png');
    preloadedImages.map.tunnel_beforebutton = loadImage('./image/additionalmap/tunnel_beforebutton.png');
    preloadedImages.map.tunnel_block = loadImage('./image/additionalmap/tunnel_block.png');
    preloadedImages.map.vertWall = loadImage('./image/additionalmap/vertWall.png');

    preloadedImages.penguin1.standing[0] = loadImage('./image/penguin1/p1c1.png');
    preloadedImages.penguin1.falling[0] = loadImage('./image/penguin1/p1f1.png');
    preloadedImages.penguin1.walking[0] = loadImage('./image/penguin1/p1w0.png');
    preloadedImages.penguin1.walking[1] = loadImage('./image/penguin1/p1w1.png');
    preloadedImages.penguin1.walking[2] = loadImage('./image/penguin1/p1w2.png');
    preloadedImages.penguin1.walking[3] = loadImage('./image/penguin1/p1w3.png');

    preloadedImages.penguin2.standing[0] = loadImage('./image/penguin2/p2c1.png');
    preloadedImages.penguin2.holding[0] = loadImage('./image/penguin2/p2h0.png');
    preloadedImages.penguin2.holding[1] = loadImage('./image/penguin2/p2h1.png');
    preloadedImages.penguin2.holding[2] = loadImage('./image/penguin2/p2h3.png');
    preloadedImages.penguin2.holding[3] = loadImage('./image/penguin2/p2h4.png');
    preloadedImages.penguin2.walking[0] = loadImage('./image/penguin2/p2w0.png');
    preloadedImages.penguin2.walking[1] = loadImage('./image/penguin2/p2w1.png');
    preloadedImages.penguin2.walking[2] = loadImage('./image/penguin2/p2w3.png');
    preloadedImages.penguin2.walking[3] = loadImage('./image/penguin2/p2w4.png');
}

setup = function() {
    //const windowWidth = 1600;
    //const windowHeight = 1200;
    createCanvas(windowWidth, windowHeight);
    const gameClient = GameClient.getInstance();
    gameClient.connect();
    setInterval(updateTime, 500);

    //create pitfill sprite
    pitFill = new PitFill('pitfill-1', 2500, 1175, 50, 50, 2000, 1500, 800, wallD, "v", 250);
    pitFill.create();

    pitFill2 = new PitFill('pitfill-2', 5700, 550, 100, 50, 4900, 700, 200, 50, 'v', -200);
    pitFill2.create();

    //tunnel
    tunnel = new Tunnel('tunnel-1', 3000, 600, 200, 1200, 110);
    tunnel.create();

    //pushing  box
    bigbox = new BigBox('bigbox-1', 3700, 1100, 200, 200);
    bigbox.create();
    //after box in-air step & button
    airstep2 = createSprite(5100, 700, 200, 50);
    airplane = createSprite(6400, 600, 1600, 50);



    //button click and entrance appears
    // buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
    // buttonDoor.create();

    //Spring 
    spring = new Spring(6400, 550, 100, 50, 45);
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
    gameEnd = new GameEnd(3600, -200);
    gameEnd.create();

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
    gameEnd.activate(myChar.player, partnerChar.player);
    //spring
    spring.activate(myChar.player);
    //tunnel
    tunnel.activate(myChar.player);

    bigbox.activate(myChar, bottomWall3, gameMap);

    //player fall
    if (myChar.player.position.y > 1300) {
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
    bottomWall = createSprite(800, 1250, 1600, wallD);
    bottomWall.immovable = true;
    bottomWall.debug = true;

    console.log(bottomWall);

    bottomWall2 = createSprite(3600, 1250, 2400, wallD);
    bottomWall2.immovable = true;
    bottomWall2.debug = true;

    bottomWall3 = createSprite(4800, 1200, 100, wallD);
    bottomWall3.immovable = true;
    bottomWall3.debug = true;

    leftWall = createSprite(0, 600, wallD, 1200);
    leftWall.immovable = true;
    leftWall.debug = true;
    rightWall = createSprite(3200, 600, wallD, 1200);
    rightWall.immovable = true;
    rightWall.debug = true;

    block1 = createSprite(1600 / 1.5, 800, 800, wallD);
    block1.immovable = true;
    block1.debug = true;

    flyingWall = createSprite(3600, 0, 2400, wallD);
    flyingWall.immovable = true;
    flyingWall.debug = true;
    gameMap.add(flyingWall);

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

    gameMap.add(gameEnd.end);
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