let myChar;
let partnerChar;
let gameMap;
let playerGroup;
let grabCase = false;
const wallD = 100;
let pitFill, buttonDoor, gameEnd, tunnel;
let elapsedTime = 0;

setup = function() {
    createCanvas(windowWidth, windowHeight);
    const gameClient = GameClient.getInstance();
    gameClient.connect();
    setInterval(updateTime, 500);

    //create pitfill sprite
    pitFill = new PitFill(width+600, height-25, 50, 50, width + width/4, height+100, width/2, wallD,"v", 100);
    pitFill.create();

    //tunnel
    tunnel = new Tunnel(width+ 1200, height-100, 200,200);
    tunnel.create();

    //pushing  box
    bigbox = createSprite(width*2 + 500 , height-100, 200,200)
    //after box in-air step & button
    airstep = createSprite(width*3 + 100, height - 350,200, 50);
    airstep2 = createSprite(width*3 + 300, height - 500,200, 50);
    airplane = createSprite(width*4 , height - 600,width, 50);
    airbutton = createSprite(width*3 + 600, height - 650,100, 50);



    //button click and entrance appears
    // buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
    // buttonDoor.create();

    //Spring 
    // spring = new Spring(width + 600, height-50);
    // spring.create();


    //initiate players
    playerGroup = new Group();
    myChar = new Character('me',"big");
    partnerChar = new Character('partner',"small");
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
    text(elapsedTime, camera.position.x + 300, myChar.player.position.y-350);

    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    camera.position.x = myChar.player.position.x;
    camera.position.y = myChar.player.position.y - height/2 + 300;
    //score (time) counting


    //pitfill rendering 
    pitFill.ispressed(myChar.player);
    //buttondoor rendering 
    // buttonDoor.ispressed(myChar.player);
    //gameend button activated
    // gameEnd.activate(myChar.player);
    //spring
    // spring.activate(myChar.player);
    //tunnel
    tunnel.activate(myChar.player);
    myChar.player.displace(bigbox);

    if (bigbox.collide(bottomWall3)){
       bigbox.immovable=true;
    }

    airbutton.collide(gameMap);
    airbutton.immovable=true;
    if(airbutton.collide(myChar.player) && (airbutton.position.x - 100<myChar.player.x) && (airbutton.position.x + 100>myChar.player.x)) {
        console.log("JH")
        airbutton.height = 25;
        if (airstep.position.y < height-300){
            airstep.position.y = airstep.position.y + deltaTime/20
        }
    }
    else {
        airbutton.height = 25;
        if (airstep.position.y > height-500){
            airstep.position.y = airstep.position.y - deltaTime/20
        }
    }

    //player movement
    playerGroup.collide(gameMap);
    if(!myChar.nowGrab){
        myChar.player.collide(partnerChar.player);
    }else if(myChar.nowGrab){
        myChar.player.overlap(partnerChar.player);
    }
    myChar.checkJump();
    partnerChar.checkJump();
    myChar.checkGrab(partnerChar);//myChar가 작은 팽귄
    partnerChar.checkGrab(myChar);

    myChar.drawPlayer();
    partnerChar.drawPlayer();

    myChar.playerMove(); // partnerChar.playerMove();

    myChar.update();
    partnerChar.update();

    partnerChar.syncPosition();//지금은 안사용
    fill(0, 255, 0);
}

createMap = function() {
    gameMap = new Group();
    bottomWall = createSprite(width/2, height+50, width, wallD);
    bottomWall.immovable = true;
    bottomWall.debug = true;

    bottomWall2 = createSprite(width*2 + width/4, height+50, width*3/2, wallD);
    bottomWall2.immovable = true;
    bottomWall2.debug = true;

    bottomWall3 = createSprite(width*2 + width, height,100, wallD);
    bottomWall3.immovable = true;
    bottomWall3.debug = true;

    leftWall = createSprite(0, height / 2, wallD, height);
    leftWall.immovable = true;
    leftWall.debug = true;
    rightWall = createSprite(width*2, height / 2, wallD, height);
    rightWall.immovable = true;
    rightWall.debug = true;

    block1 = createSprite(width / 1.5, height / 1.5, width / 2, wallD);
    block1.immovable = true;
    block1.debug = true;

    //add pitfill to the gamemap
    gameMap.add(pitFill.button);
    gameMap.add(pitFill.pit);
    // gameMap.add(buttonDoor.box);
    // gameMap.add(buttonDoor.cliff);
    // gameMap.add(buttonDoor.cliff2);
    // gameMap.add(buttonDoor.button);
    // gameMap.add(spring.box);
    gameMap.add(tunnel.tunnel);
    gameMap.add(tunnel.beforebutton);
    gameMap.add(tunnel.afterbutton);

    // gameMap.add(gameEnd.end);
    gameMap.add(bottomWall);
    gameMap.add(bottomWall2);
    gameMap.add(bottomWall3);
    gameMap.add(bigbox);
    gameMap.add(leftWall);
    gameMap.add(airstep);
    gameMap.add(airstep2);
    gameMap.add(airplane);
    gameMap.add(airbutton);
    // gameMap.add(rightWall);
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
                partnerChar.player.setSpeed(30,-135);
            }else{
                partnerChar.player.setSpeed(30,-45);
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

updateTime = function() {
    elapsedTime = elapsedTime+ 1
}