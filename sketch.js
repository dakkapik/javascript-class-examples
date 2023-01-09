let game;

function setup() {
  frameRate(60);

  game = new Game();
  
  /*
  addPlayer function => 
    x, y, width, height, characterName
  */
  game.addPlayer(100, 10, 40, 80, "Aurelian");
  game.addPlayer(300, 10, 40, 80, "Guideon");

  /*
  addBox function => 
    x, y, width, height
  */

  game.addBox(0,350, 900,50);
  game.addBox(0, 0, 10,350);
  game.addBox(590, 0, 10, 350);
  
  /*
  we take a reference to the stored player and we modify them like this
  */
  let p1 = game.entities[game.entityIds[0]];
  let p2 = game.entities[game.entityIds[1]];
  
  /*
   addAttack command order => 
   width, height, keyCode, name, spritePath, duration, cooldown, knockback, damage, yOffset, xOffset
   */
  
  p1.addAttack(30, 30, 70, 'sword','assets/char_sword.png',10,  5,  1, 10, 10);
  p1.addAttack(20, 20, 82, 'kick', 'assets/char_kick.png',  30, 30, 20, 20, 50, -50);
  p1.addAttack(15, 25, 69, 'grab', 'assets/char_bills.png', 30, 10, -1, 25, 15);
  
  /*
  addMoveKeys => 
  ***take object with move key value pairs
  */

  let keysP1 = {
    left: 65,
    right: 68,
    jump: 32
  }
  
  let keysP2 = {
    left: 37,
    right: 39,
    jump: 38
  }
    
  p1.addMoveKeys(keysP1);
  p2.addMoveKeys(keysP2);

  p1.showHitbox();
  p2.showHitbox();
  
  createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  game.update();
}