# ID311_FinalProject
1) PitFill.js
PitFill is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

```js
pitFill = new PitFill(width, height-50, 100, 50,width-200, height-50, 50, 50);
```
first four parameters are about the box positiopn and box size. The next four parameters are about the  button position and button size. We can customie the size and position of the button and object affectd by the button using this. The last two parameter is how the block will move - the direction and the amount of movement. 

Pitfillobject.create () draws the sprites
Pitfillobject.ispressed(player) decides if the player is pressing button from the top and moves the position of the sprite. 