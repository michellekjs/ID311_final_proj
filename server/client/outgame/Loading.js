const MAX_HIGHSCORE_PLAYERS = 10;

function preload() {
    font = loadFont('../assets/font/coolveticarg.otf');
}

function setup() {
    // createcanvas and background
    createCanvas(windowWidth, windowHeight);
    background('#7FCCDB');

    //button styling
    startButton = createButton('Start Game')
    startButton.mousePressed(moveNickname);
    startButton.position(windowWidth / 2 - 100, windowHeight - 150)
    startButton.style('background', 'none')
    startButton.style('color', 'white')
    startButton.style('border', 'none')
    startButton.style('font-size', '50px')
    startButton.style('font-weight', 'bold')
    startButton.style('font-family', 'coolveticarg')

    // read scores
    //scores = JSON.parse(fs.readFileSync('../score.json').toString()).data;
    console.log(score);
}

function draw() {
    textSize(30)
    rectMode(CENTER)
    noStroke();
    fill(255)
    textAlign(CENTER);
    textFont(font)
    text('Leader Board', 3 * windowWidth / 4, windowHeight / 2 - 400)
    rect(3 * windowWidth / 4, windowHeight / 2 - 80, 400, 600, 20)

    // display scores
    fill(0);
    text('Player1', 3 * windowWidth / 4 - 120, windowHeight / 2 - 450);
    text('Player2', 3 * windowWidth / 4, windowHeight / 2 - 450);
    text('Time', 3 * windowWidth / 4 + 120, windowHeight / 2 - 450);
    for (let i = 0; i < score.data.length; i++) {
        const col = score.data[i];
        text(col.player1, 3 * windowWidth / 4 - 120, windowHeight / 2 - 450 + 50 * (i + 1));
        text(col.player2, 3 * windowWidth / 4, windowHeight / 2 - 450 + 50 * (i + 1));
        text(col.score, 3 * windowWidth / 4 + 120, windowHeight / 2 - 450 + 50 * (i + 1));
    }
}

//
function moveNickname() {
    //window.location.href = "../nickname.html"
    window.location.href = "../nickname";
}


window.preload = preload;
window.setup = setup;
window.draw = draw;