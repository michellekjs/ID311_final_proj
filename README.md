# ID311_FinalProject

## Game Concept
The baby penguin and adult penguin lost an egg that was on an iceberg. They are on a chase to follow the egg to the destination point to get back their precious egg. 

## Game Explanation
Our game is a cooperation game of 2 players to reach the destination in shorter time. The scores are equivalent to the amount of time it took the two players to escape the map. 

### Rule
Using the map gimmicks and cooperating with the other player, the players have to reach the destination point. 

Player1 would be a large penguin which can
- grab and throw the small penguin
- push boxes
- image

  <img src = "./image/penguin1/p1c1.png">    

Player2 would be a small penguin that can
- be thrown by the large penguin
- do double jump
- image

  <img src = "./image/penguin2/p2c1.png">    

There are several map gimmicks in this map, and by using each of the penguin's capabilities, the penguins have to escape the map wisely.
1. Pit-Filling gimmick : If one penguin pushes the button , the pit (empty blank space) will be filled by ascending iceberg. The small penguin should be thrown by the large penguin to another side of the pit. THe small penguin will step on the button and fill in the pit so that the large penguin can continue the journey with it. 
2. Tunnel gimmick : The tunnel is of height that only the small penguin can pass. The small penguin will pass through the tunnel and press a button. THen the tunnel will disappear so that the big penguin cna continue the journey. 
3. ButtonDoor : The buttondoor gimmick is where the player can press the button on top of the big box and then the box will split horizontally into two parts. There can be an ending point inside the splitting element or it can be used to just passing through. 
4. Spring : Spring gives force to the player to jump in certain direction. 


## Code Explanation
### Basic information
The game is implemented using the socket.io(for multiplay), p5.js(out-game part) and p5.play(in-game part)

### UML

### Assets
1. We drew the sprites of the penguins, background, boxes, and walls(floors), egg, and any other things needed to be rendered in the screen. They are stored in the  ~/image folder, in the root.
2. The font is placed inside ~/server/client/assets/font. The font we used is "Coolvetica".
3. The material icons used in the outgame part is placed inside ~/server/client/assets/icon
 
### Implementation
1. Server element : _server.js_
2. Player element: _PlayerClinet.js_
3. Out-game elements: _outgame folder_ 
4. in-game elements : _src folder_

**game sprite implementation** 

(what each of the gimmicks do are written in the upper part of the document [Rule](###Rule))

_src/PitFill.js_

  PitFill is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

  ```js
  pitFill = new PitFill(width, height-50, 100, 50,width-200, height-50, 50, 50);
  ```
  first four parameters are about the box positiopn and box size. The next four parameters are about the  button position and button size. We can customie the size and position of the button and object affectd by the button using this. The last two parameter is how the block will move - the direction and the amount of movement. 

  Pitfillobject.create () draws the sprites
  Pitfillobject.ispressed(player) decides if the player is pressing button from the top and moves the position of the sprite. 

_src/ButtonDoor.js_
  (This element is implemented but is not in the map for more fluent flow of the game. It functions and for future use, will leave document here.)

  ButtonDoor is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

  ```js
  buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
  ```
  first four parameters are about the button position and button size. The next four parameters are about the  cliff position and cliff size. The buttondoor will split up-down into exactly same two parts. 

  ButtonDoorobject.create () draws the sprites
  ButtonDoorobject.ispressed(player) decides if the player is pressing button and splits the cliff.


_src/Tunnel.js_
  Tunnel is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

  ```js
  buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
  ```
  first four parameters are about the button position and button size. The next four parameters are about the  cliff position and cliff size. The buttondoor will split up-down into exactly same two parts. 

  ButtonDoorobject.create () draws the sprites
  ButtonDoorobject.ispressed(player) decides if the player is pressing button and splits the cliff.











- multiplay implementation



