function preload(){
  font = loadFont('../assets/font/coolveticarg.otf');
}

function setup(){
  // textFont(font);
  createCanvas(windowWidth, windowHeight);
  background('#7FCCDB');  

  searchfriend = createInput('').attribute('placeholder', 'Search your friend');
  searchfriend.position(400, 330)
  searchfriend.style('border-radius', '20px');
  searchfriend.style('border', 'none');
  searchfriend.style('width', '540px');
  searchfriend.style('height', '80px');
  searchfriend.style('font-family', 'coolveticarg');
  searchfriend.style('font-size', '20px');
  searchfriend.style('color', '#F7F7F7');


  button = createButton('Search');
  button.mousePressed(moveWaitroom);
  button.position(950,330)
  button.style('width', '150px');
  button.style('height', '80px');
  button.style('border-radius', '20px');
  button.style('border', 'none');
  button.style('box-shadow', '2px 2px 2px 1px rgba(0, 0, 0, 0.2)');
  button.style('fontSize', '20px');
  button.style('font-family', 'coolveticarg');


  randomSelect = createButton('Random Match');
  randomSelect.position(400, 580)
  randomSelect.mousePressed(moveWaitroom);
  randomSelect.style('border-radius', '20px');
  randomSelect.style('border', 'none');
  randomSelect.style('width', '700px');
  randomSelect.style('height', '80px');
  randomSelect.style('font-family', 'coolveticarg');
  randomSelect.style('box-shadow', '2px 2px 2px 1px rgba(0, 0, 0, 0.2)');
  randomSelect.style('font-size', '20px');

}

function draw(){
  textFont(font)
  textSize(30)
  fill(255)
  text("Play with Friend",400, 300 )
  text("Play with Stranger", 400, 550)
  text("My Nickname",windowWidth-200, 50 )
  
}


function moveWaitroom() {
  window.location.href = "../waitroom.html"
}


window.preload = preload;
window.setup = setup;
window.draw = draw;

