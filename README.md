# ID311_FinalProject

Link to git : [git](https://github.com/jj139811/ID311_FinalProject.git)/
[git for ID311](http://git.prototyping.id/20180517/ID311_FinalProject.git)

Members : 20160509 JeongJae Lee(이정재), 20180517 Chaeyoung Lee(이채영), 20190652 Sungmin Choi(최성민)

Link to demo video : [Demo-Video](https://youtu.be/ghRHqHJwtWE)


## Game Concept
The baby penguin and adult penguin lost an egg that was on an iceberg. They are on a chase to follow the egg to the destination point to get back their precious egg. 

## Game Explanation
Our game is a cooperation game of 2 players to reach the destination in shorter time. The scores are equivalent to the amount of time it took the two players to escape the map. 

## Game Flow
Loading page -> nickname enter -> establish/enter room -> start when both are ready -> gameplay -> game over

## Rule
Using the map gimmicks and cooperating with the other player, the players have to reach the destination point. 
### Players
Player1 would be a large penguin which can
- grab and throw the small penguin
- push boxes (some of the boxes)
- image

  <img src = "./image/penguin2/p2c1.png">    

Player2 would be a small penguin that can
- be thrown by the large penguin
- do double jump
- image

  <img src = "./image/penguin1/p1c1.png">    

### Map
There are several map gimmicks in this map, and by using each of the penguin's capabilities, the penguins have to escape the map wisely.

<img src = "./image/markdown/map.jpeg">   

1. Pit-Filling gimmick : If one penguin pushes the button , the pit (empty blank space) will be filled by ascending iceberg. The small penguin should be thrown by the large penguin to another side of the pit. THe small penguin will step on the button and fill in the pit so that the large penguin can continue the journey with it. 
2. Tunnel gimmick : The tunnel is of height that only the small penguin can pass. The small penguin will pass through the tunnel and press a button. THen the tunnel will disappear so that the big penguin cna continue the journey. 
3. BigBox : The bigbox is pushed by the big penguin so that the players can jump on it to move to higher place that is not reachable only by jump
4. Spring : Spring gives force to the player to jump in certain direction. 

### Operations
Each of the penguins are manipulated by key pressing. 
1. left arrow key : move left
2. right arrow key : move right
3. up arrow key : jump
4. g key : big penguin grabs small penguin. If g is pressed again, the big penguin throws the penguin.

## Code Explanation
### Basic information
The game is implemented using the socket.io(for multiplay), p5.js(out-game part) and p5.play(in-game part)

### UML
#### out-game uml
<img src = "./image/markdown/outgame_uml.png">   

#### in-game uml
<img src = "./image/markdown/ingame_uml.png">    

#### server uml
<img src = "./image/markdown/server_uml.png">    


### Assets
1. We drew the sprites of the penguins, background, boxes, and walls(floors), egg, and any other things needed to be rendered in the screen. They are stored in the  ~/image folder, in the root.
2. The font is placed inside ~/server/client/assets/font. The font we used is "Coolvetica".
3. The material icons used in the outgame part is placed inside ~/server/client/assets/icon
 
### Implementation 
1. Server element : _server.js_ 
2. Player element: _PlayerClient.js_
3. Out-game elements: _outgame folder_ 

    **Start Game Implementation**

    The order of files executed in the outgame folder is like the following : Loading.js -> Nickname.js -> Search.js -> WaitRoom.js. Each of the files have separate html files that are called on page rendering.  

    - _outgame/Loading.js_

      This is a page where the leaderboard and the background sprite is rendered. 
      ```js
       window.location.href = "../nickname";
      ```
      on game start, the page is moved to nickname page. 

    - _outgame/Nickname.js_

      This is a page where the user inputs their playername to use during the game. 

      ```js
      const nickname = String(player.value());
      sessionStorage.setItem('nickname', nickname);
      window.location.href = "../search?nickname=" + nickname;
      ```
      We use sessionStorage to pass on the nickname to the search page. 

    - _outgame/Search.js_

      This is a page where the user can search for their friend with their nickname or to get random player assigned for cooperation game. 

        ```js
        const nickname = sessionStorage.getItem('nickname');
      window.location.href = "../waitroom?nickname=" + nickname + "&random=" + String(isRandom) + (isRandom ? "" : ("&partner=" + String(searchfriend.value())));
        ```
      We put the information in the link depending on if it is random search or friend search. 

    - _outgame/WaitRoom.js_
    The waitroom is where the matched players wait to enter the game. If both players are ready, they can move to the game. We added small effect where the code detects the mouse position. 



    **End Game Implementation**
    - the file related to this part is GameOver.js. If the penguin touches the game over component, the score will be calculated and the screen will move to the endgame. If the player presses the endgame button, it will go to the start of the game, the Loading.js page.

4. in-game elements : _src folder_

    The character sprites are 200*100 and 100*100 for big and small respectively. THe buttons are of fixed size 100 * 50 for the convenience of applying the custom-made sprite. 

    **Game Sprite Implementation** 

    (what each of the gimmicks do are written in the upper part of the document [Rule](###Rule))

    - _src/PitFill.js_ 

      PitFill is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

      ```js
      pitFill = new PitFill(width, height-50, 100, 50,width-200, height-50, 50, 50);
      ```
      first four parameters are about the box positiopn and box size. The next four parameters are about the  button position and button size. We can customie the size and position of the button and object affectd by the button using this. The last two parameter is how the block will move - the direction and the amount of movement. 

      Pitfillobject.create () draws the sprites
      Pitfillobject.ispressed(player) decides if the player is pressing button from the top and moves the position of the sprite. 

      ----

    - _src/ButtonDoor.js_

      (This element is implemented but is not in the map for more fluent flow of the game. It functions and for future use, will leave document here.)

      ButtonDoor is a gimmick that fills up a space on button press to make other map sprite move and mvoe on.

      ```js
      buttonDoor = new ButtonDoor(width + 100, height-50, 50, 100,width+ 300, height-50, 200, 200);
      ```
      first four parameters are about the button position and button size. The next four parameters are about the  cliff position and cliff size. The buttondoor will split up-down into exactly same two parts. 

      ButtonDoorobject.create () draws the sprites
      ButtonDoorobject.ispressed(player) decides if the player is pressing button and splits the cliff.

      ----
    - _src/Tunnel.js_

      Tunnel is a gimmick that only the small penguin can go through and widen the tunnel by pressing the button after the tunnel. 

      ```js
          tunnel = new Tunnel('tunnel-1', 3000, 600, 200, 1200, 110);
      ```
      first four parameters are about the tunnel position and tunnel size. 

      TunnelObject.create () draws the sprites
      TunnelObject.activate(player) gets the button click and moves the tunnel so that the big penguin can go through.

      ----
    - _src/BigBox.js_

      Big box is pushed by the big penguin so that the small penguin can jump on top of it to move to higher place by being thrown or by deouble jump.

      ```js
        bigbox = new BigBox('bigbox-1', 3700, 1100, 200, 200);
        bigbox.create();
        bigbox.box.addImage(preloadedImages.map.box);
      ```
      ----
    -  _main.js_  
        ```js
            flyingWall = createSprite(3600, 0, 2400, wallD);
            flyingWall.immovable = true;
            flyingWall.debug = true;
            gameMap.add(flyingWall);
        ```
        The gimmick that was added the most recently is implemented directly to the main.js file. If the small penguin steps up on the big penguin and climb to the high part of the map and press the button, the sprite that worked as a bridge will move up and down. This enables the big penguin to climb onto the moving sprite and reach where the small penguin is. 

    **Character Implementation** 
    - _src/Character.js_ 
      The animation is created with the custom drawns prites of our team. Each of the motion sprites alters automatically as if the penguin is moving its limbs.
      In this part, we define the actions of the characters. Simple moving left/right, grab/throw of the large penguin, jumping motion is done here.
      Another important part is that in this part of teh code, 
      ```js
          syncPosition() {
          const network = this.network;
          this.player.position.x = network.posX;
          this.player.position.y = network.posY;
          this.nowGrab = network.nowGrab;
          this.direction = network.direction;
          this.keyPressed = network.keyPressed;
          this.jumping = network.jumping;
      }
      ```
      We communicate with the network which is defined as CharacterNetwork(tag) (tag is bigpenguin or smallpenguin.) and sync the position with the other players.


## References
1. [p5.js](https://p5js.org/ko/)
2. [p5.play](https://molleindustria.github.io/p5.play/docs/index.html)
3. [socket.io](https://socket.io/)
4. [AWS-EC2](https://aws.amazon.com/ko/ec2/?trk=68913a17-4967-41f6-a766-0f2eb338dd04&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Compute|EC2|KR|KR|Text&s_kwcid=AL!4422!3!588924203019!e!!g!!aws%20ec2&ef_id=Cj0KCQjwhqaVBhCxARIsAHK1tiOAIq27b3H3smoaLR1GpEdpKTnyFsDxrih3IXLkGZqS_dibWF-hq-YaAvYWEALw_wcB:G:s&s_kwcid=AL!4422!3!588924203019!e!!g!!aws%20ec2)
