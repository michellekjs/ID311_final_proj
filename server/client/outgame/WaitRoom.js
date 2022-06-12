// import closelock from '../assets/icon/closelock.png';
// import openlock from '../assets/icon/openlock.png';
let lockd = true;

//localstorage
function preload() {
    font = loadFont('../assets/font/coolveticarg.otf');
    cl = loadImage('../assets/icon/closelock.png')
    ol = loadImage('../assets/icon/openlock.png')
}

function setup() {
    // init network
    const waitRoom = this;
    const waitRoomClient = WaitRoomClient.getInstance();
    waitRoomClient.connect();
    waitRoomClient.addRPC('outgame-sync', (args) => {
        const params = JSON.parse(args);
    });

    waitRoomClient.addRPC('outgame-start', (args) => {
        const params = JSON.parse(args);
        sessionStorage.setItem('room-info', args);
        waitRoom.moveMain();
    });

    p1txt = "player1"
    p2txt = "player2"
    textFont(font)

    // createCanvas(1000,1000)
    button = createButton('Start Game');
    button.position(windowWidth / 2 - 100, windowHeight * 3 / 4);
    button.style('height', '50px');
    button.style('border-radius', '20px');
    button.style('border', 'none');
    button.style('background', 'none');
    button.style('fontSize', '40px');
    button.style('color', 'white');
    button.style('font-family', 'coolveticarg');
    button.mousePressed(pressReady);

    if (lockd) {
        lock = createImg('../assets/icon/closelock.png');
        lock.style('color', 'rgb(255,255,255)')
    } else {
        lock = createImg('../assets/icon/openlock.png');
    }
    lock.position(windowWidth - 80, 50);
    lock.mousePressed(changeImage)

    crown = createImg('../assets/icon/crown.png');
    crown.position(windowWidth / 3 - 40, 80);
    crown.style('width', '100px');
    crown.style('height', '100px');



    createCanvas(windowWidth, windowHeight);

}

function draw() {

    background('#7FCCDB');
    textAlign(CENTER)
    textSize(40)
    fill(255)
    textSize(30)
    text("Nickname1", windowWidth / 3, 200)
    text("Nickname2", windowWidth * 2 / 3, 200)

    textAlign(CENTER);
    text("Tutorial", windowWidth - 160, 80)

    noFill();
    stroke(255);
    strokeWeight(4);
    if (mouseX < windowWidth / 3 + 310) {
        rect(windowWidth / 3 - 190, 130, 400, 500, 40)
    } else {
        rect(windowWidth * 2 / 3 - 190, 130, 400, 500, 40)
    }

    // image(cl, windowWidth-80, 50, 50, 50);

}

function pressReady() {
    const waitRoomClient = WaitRoomClient.getInstance();
    waitRoomClient.sendMessage('outgame-input', {
        input: OUTGAME_INPUT.READY
    });
}

function moveMain() {
    const nickname = sessionStorage.getItem('nickname');
    window.location.href = "../game?nickname=" + nickname;
}

function changeImage() {
    lockd = !lockd
}

function myCheckedEvent() {
    if (checkbox.checked()) {
        console.log('Checking!');
    } else {
        console.log('Unchecking!');
    }
}

// export {Player};

window.preload = preload;
window.setup = setup;
window.draw = draw;