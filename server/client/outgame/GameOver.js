function preload(){
  font = loadFont('../assets/font/coolveticarg.otf');
}

function setup(){
  // createcanvas and background
  createCanvas(windowWidth, windowHeight);
  background('#7FCCDB');  

  //button styling
  startButton = createButton('Restart Game')
  startButton.mousePressed(moveHome);
  startButton.position(windowWidth/2-100,windowHeight/2-100)
  startButton.style('background', 'none')
  startButton.style('color', 'white')
  startButton.style('border', 'none')
  startButton.style('font-size', '50px')
  startButton.style('font-weight', 'bold')
  startButton.style('font-family', 'coolveticarg')
}

function draw(){
  // textSize(30)
  // rectMode(CENTER)
  // noStroke();
  // fill(255)
  // textAlign(CENTER);
  // textFont(font)
  // text('Leader Board',3*windowWidth/4, windowHeight/2 -400)
  // rect(3*windowWidth/4, windowHeight/2-80, 400, 600, 20)

  
}

//
function moveHome() {
  window.location.href = "../index.html"
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

