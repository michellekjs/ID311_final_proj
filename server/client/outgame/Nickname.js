function preload(){
  font = loadFont('../assets/font/coolveticarg.otf');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background('#7FCCDB');  
  //input box and styling
  player = createInput('').attribute('placeholder', 'Enter your nickname');
  player.style('width', '500px');
  player.style('height', '100px');
  player.style('border-radius', '20px');
  player.style('border', 'none');
  player.style('text-align', 'center');
  player.style('font-family', 'coolveticarg');
  player.style('font-size', '30px');
  player.center();

  //enter button and styling  
  button = createButton('Enter');
  button.mousePressed(moveMain);
  button.style('width', '200px');
  button.style('height', '50px');
  button.style('border-radius', '20px');
  button.style('border', 'none');
  button.style('background', 'none');
  button.style('fontSize', '40px');
  button.style('color', 'white');
  button.style('font-family', 'coolveticarg');
  button.position(windowWidth/2-100, windowHeight/2 + 100);
}

function draw(){
  
}


function moveMain() {
  window.location.href = "../search.html"
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

