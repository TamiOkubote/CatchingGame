let fallingItems;
let totalScore = 0;
let highScore = 0;
let itemFS = 5;
let itemsMissed=0;
let itemsCaught=0;
let badItems = 0;

let itemNo = 0;
let explSound;
let pMusic;
let countdownValue=5;
let state = "menu"; 
// Different states: menu (at the start), countdown (When "Start Game" button is clicked, game (Where actual gameplay occurs, end (after the gameplay has occured and countdown reached 0)

function preload() {
  explSound = loadSound("Sounds/explSound.wav");
  
  // Load local images from the assets folder with callbacks for success and error
  swordImg = loadImage('Images/pirateSword.png', 
    () => { console.log('Sword image loaded successfully!'); },
    (err) => { 
      console.error('Failed to load sword image:', err); 
      // Fallback: If the sword image fails, use a placeholder (colored circle)
      swordImg = createGraphics(50, 50); // Create a placeholder graphic
      swordImg.fill(0, 0, 255); // Blue color for sword
      swordImg.rect(0, 0, 50, 50); // Draw a blue square (simulate sword)
      console.log('Fallback: Using blue square for sword instead');
    }
  );

  bombImg = loadImage('Images/bomb.PNG', 
    () => { console.log('Bomb image loaded successfully!'); },
    (err) => { 
      console.error('Failed to load bomb image:', err); 
      // Fallback: If the bomb image fails, use a placeholder (colored circle)
      bombImg = createGraphics(50, 50); // Create a placeholder graphic
      bombImg.fill(255, 0, 0); // Red color for bomb
      bombImg.ellipse(25, 25, 50, 50); // Draw a red circle (simulate bomb)
      console.log('Fallback: Using red circle for bomb instead');
    }
  );

  pearlImg = loadImage('Images/pearl.PNG', 
    () => { console.log('Pearl image loaded successfully!'); },
    )
  
  rubyImg = loadImage('Images/ruby.PNG', 
    () => { console.log('Ruby image loaded successfully!'); },
    (err) => { console.error('Failed to load pearl image:', err); }
  );
  
  goldImg = loadImage('Images/gold.PNG', 
    () => { console.log('Gold image loaded successfully!'); },
    (err) => { console.error('Failed to load pearl image:', err); }
  );
  
  skullImg = loadImage('Images/skull.png', 
    () => { console.log('Skull image loaded successfully!'); },
    (err) => { console.error('Failed to load pearl image:', err); }
  );

  barrelImg = loadImage('Images/barrel.png', 
    () => { console.log('Barrel image loaded successfully!'); 
          }
                        )}

function setup() { // this function sets up the screen which will be used in the gameplay, initialising the falling items into an array and set the falling speed of these falling items
  fallingItems = [];

  createCanvas(500, 500);

  // create array of falling items, following algorithm on document.
  for (let i = 0; i < 5; i++) {
    j = i * 5;
    pearl = new fallingItem(random(width), 0, itemFS, pearlImg, 5);
    fallingItems[j] = pearl;
    j += 1;

    sword = new fallingItem(
      random(width),
      0,
      itemFS,
      swordImg,
      0
    );
    fallingItems[j] = sword;
    j += 1;

    ruby = new fallingItem(random(width), 0, itemFS, rubyImg, 15);
    fallingItems[j] = ruby;
    j += 1;

    gold = new fallingItem(random(width), 0, itemFS, goldImg, 10);
    fallingItems[j] = gold;
    j += 1;

    skull = new fallingItem(random(width), 0, itemFS, skullImg, -5);
    fallingItems[j] = skull;
    j += 1;
    
    bomb = new  pBomb(random(width),0,itemFS,bombImg,-100,explSound);
    fallingItems[j] = bomb;
    j += 1;
  }
  fallingItems = shuffle(fallingItems);

  //create new barrel with xPos as parameter.

  barrel = new barrel(200);

}

function draw() { // this function displays the image of the background, as well as the multiple states that are going to be present in the game - "menu/countdown/game/end", which will interpolate with each other throughout the game (e.g menu --> countdown --> game --> end --> menu)
  background("lightblue");
  
   if (state === "menu") {
        drawMenu();
    } else if (state === "countdown") {
        drawCountdown();
    }else if (state === "game"){
      playGame()
    
    } else if (state === "end") {
        displayGameOver(); }
}

function drawMenu() { // this function displays all the components of the menu scrren, with text for the name of the game, the value of the high score, which will be updated if the user accumulateds a higher score, and the button named "Start Game" which takes you to the "countdown" state of the game
  push()
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Pirate Catch Game", width / 2, height / 3); // displays Title of game

    textSize(24);
    text("High Score: " + highScore, width / 2, height / 2 - 20); // displays high score

    fill(100, 200, 100);
    rect(width / 2 - 100, height / 2, 200, 50); // draw "Start Game" button

    fill(255);
    textSize(18);
    text("Start Game", width / 2, height / 2 + 30); // "Start Game" text
  pop()
}

function drawCountdown() { // this function displays the components in the "countdown" state, with the text centered for the countdown that gies from 5 to 1, ticking down every second. Once it reaches 0, it will now switch to the "game" state
  push()
    background("pink");
    textAlign(CENTER);
    fill(255);
    textSize(48);

    if (countdownValue > 0) {
        text(countdownValue, width / 2, height / 2); // Show countdown

        if (frameCount % 60 === 0) {
            countdownValue--; // Countdown ticks down every second
        }
    } else {
        state = "game"; // After countdown, switch to game state
    }
  pop()
}
   
  
function playGame(){ // this function will prompt for the items to fall down the screen/canvas, showing the barrel, score and the items falling. If the barrel collects 3 weapons/bad items, OR misses 5 items of treasure, the game ends
    //end game if too many misses
    if(itemsMissed>=5 || badItems>=3){
    state = "end";
  }
    if (state=="end") {
    displayGameOver(); 
    return;
  }

  itemsFall();
  showBarrel();
  showScores();
  
}

function showBarrel() { // this functions displays the barrel on the screen and allows it to move left and right
  barrel.display();
  barrel.move();
}

function itemsFall(){ // this function displays the falling items and allows the array of falling items to fall down the screen. If it's unable to do so, the game ends.
  //check that the array of items is not empty.
    if (itemNo==fallingItems.length-1){fail=false;
      state="end";}
  
   else{let item = fallingItems[itemNo];
   item.display();
   item.fall();
   checkCaught(item);
       }
}

function checkCaught(item){ // this functions checks/validates on whether the falling items has been caught/collected by the barrel. It validates whether a bomb has been collected by using the selction statement to determine the value of the item - if it's equal to -100, that means the barrel has collected a bomb, and therefore and exploding sound is present and the game ends. It will also check on whether any swords/skulls have been collected. If so, the score goes back to 0 and the number of bad items/weapons caught is incremented by 1. Once the item is caught, it then disappears from the screen. If a good item/treasure is missed, then the number of items missed is also incremented by 1.
  if (dist(item.xPos,item.yPos,barrel.xPos,height*0.9)<50) {
    itemsCaught+=1;
      
    //check for bomb
    if (item.pValue === -100) {
        item.playSound();
          state="end"; 
      // End the game on bomb catch
        }
  //checking for swords or skulls caught
    else if (item.img == swordImg || item.img == skullImg){totalScore=0
        badItems+=1;}
    
    else {totalScore += item.pValue;}
    
   //Remove item after catching
        fallingItems.splice(item, 1); 
      }
  
 //Increment good items missed. 
if(item.yPos>height ){
  if(item.img!==swordImg && item.img !== skullImg && item.img !== bombImg){
    itemsMissed+=1;}
  itemNo+=1;
  }  
}

function showScores(){ // this function displays the score, items missed, and items caught on the left-hand corner of the canvas
  //Display scores in top left of canvas
  fill(0);
  textSize(24);
  text("Score: " + totalScore, 10, 30);
  text("Missed: "+itemsMissed,10,55);
  text("Caught: "+itemsCaught,10,80);
  }

function displayGameOver() { // Function to display the game over screen, with the text "Game Over" and the "Score" and "High score". If the high score accumulated in the game is larger than the previous high score, that high score gets updated.
  
  push()
    state = "end";
  
    textAlign(CENTER);  // puts text center
    fill(255);
    textSize(32);
    text("Game Over", width / 2, height / 3); // displays "Game over" text at end mode/state
    text("Score: " + totalScore, width / 2, height / 2); // displays "Score" text below

    if (totalScore > highScore) { // condition/ selection structure to see if current score is higher high score. If so, will set current score as new high score
        highScore = totalScore;
        text("New High Score!", width / 2, height / 2 + 40); // displays "New High Score" text
    }

    fill(100, 200, 100);
    rect(width / 2 - 100, height / 2 + 80, 200, 50);

    fill(255);
    textSize(18);
    text("Back to Menu", width / 2, height / 2 + 110); // displays "Back to Menu" text at end state/mode
  pop();
}

function mousePressed() { // function for certain commands for the mouse when clicked - in "menu" state, if the mouse is pressed inside the are of the "Start Game" box, set state to "countdown" and start game from there. Now if the mouse is pressed either in the coordinates of the easy/intermediate/hard box, then it will set the difficulty of the game to either easy/intermediate/hard, by decreasing the target sizes and by adding more targets onto the screen.
    
  if (state === "menu") { 
        if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 && mouseY < height / 2 + 50) {
            state = "countdown";
          resetGame()
        }
       
    }
  else if (state === "end") { // when the mouse presses the coordiantes of the "Back to Menu" box, it will set state of game back to "menu", allowing the game to restart/loop itself (with the high score implemented) 
        if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 80 && mouseY < height / 2 + 130) {
            state = "menu";
        }
    }
}

function resetGame(){ // this function resets the game after clicking the "Back to Menu" button, back to the "menu" state, and redos the value of the score, items missed/caught, countdown value and score of the "bad items"/weapons
    itemsMissed=0;
    itemsCaught=0;
    countdownValue=5;
    badItems = 0;
    totalScore=0;
}

