function preload(){
  font = loadFont('../assets/font/coolveticarg.otf');
}

function setup(){
  // textFont(font);
  player = createInput('').attribute('placeholder', 'Enter your nickname');
  button = createButton('Enter');
  button.mousePressed(moveMain);
}

function draw(){
  
}


function moveMain() {
  window.location.href = "../search.html"
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

