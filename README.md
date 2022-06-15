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

Player2 would be a small penguin that can
- be thrown by the large penguin
- do double jump

There are several map gimmicks in this map, and by using each of the penguin's capabilities, the penguins have to escape the map wisely.
1. Pit-Filling gimmick : If one penguin pushes the button , the pit (empty blank space) will be filled by ascending iceberg. The small penguin should be thrown by the large penguin to another side of the pit. THe small penguin will step on the button and fill in the pit so that the large penguin can continue the journey with it. 
2. Tunnel gimmick : The tunnel is of height that only the small penguin can pass. The small penguin will pass through the tunnel and press a button. THen the tunnel will disappear so that the big penguin cna continue the journey. 


## Code Explanation
### UML
### Structure
1. Server element : _server.js
2. Player element: _PlayerClinet.js_
3. Out-game elements: _outgame folder_ 

4. in-game elements : _src folder_
- game sprite implementation
1) src/PitFill.js
PitFill is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

```js
pitFill = new PitFill(width, height-50, 100, 50,width-200, height-50, 50, 50);
```
first four parameters are about the box positiopn and box size. The next four parameters are about the  button position and button size. We can customie the size and position of the button and object affectd by the button using this. The last two parameter is how the block will move - the direction and the amount of movement. 

Pitfillobject.create () draws the sprites
Pitfillobject.ispressed(player) decides if the player is pressing button from the top and moves the position of the sprite. 







- multiplay implementation



