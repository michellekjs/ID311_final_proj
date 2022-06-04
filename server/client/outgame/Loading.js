function preload(){
  font = loadFont('../assets/font/coolveticarg.otf');
}

function setup(){
  // createcanvas and background
  createCanvas(windowWidth, windowHeight);
  background('#7FCCDB');  

  //button styling
  startButton = createButton('Start Game')
  startButton.mousePressed(moveNickname);
  startButton.position(windowWidth/2-50,windowHeight-100)
  startButton.style('background', 'none')
  startButton.style('color', 'white')
  startButton.style('border', 'none')
  startButton.style('font-size', '30px')
}

function draw(){
  textSize(30)
  rectMode(CENTER)
  noStroke();
  fill(255)
  textAlign(CENTER);
  text('Leader Board',3*windowWidth/4, windowHeight/2 -330)
  rect(3*windowWidth/4, windowHeight/2, 400, 600, 20)

  
}

//
function moveNickname() {
  window.location.href = "../nickname.html"
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

