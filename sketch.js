let game;

function setup() {
  frameRate(60);

  game = new Game();
  
  /*
  addPlayer function => 
    x, y, width, height, characterName
  */
  let p1 = game.addPlayer(100, 10, 40, 80, "Aurelian", 'assets/char_idle.png');
  let p2 = game.addPlayer(300, 10, 40, 80, "Guideon", 'assets/char_idle.png');

  /*
  addBox function => 
    x, y, width, height
  */

  let box1 = game.addBox(0,350, 900,50);
  let box2 = game.addBox(0, 0, 10,350);
  let box3 = game.addBox(590, 0, 10, 350);

  box1.color="yellow"
  
  /*
   addAttack command order => 
    1. width
    2. height
    3. keyCode
    4. name
    5. spritePath
    6. duration
    7. cooldown
    8. xKnockback
    8. yKnockback
    9. damage
    10. yOffset <optional>
    11. xOffset <optional>
   */
  
  p1.addAttack(30, 30, 70, 'sword','assets/char_sword.png',10,  5,  1,0, 10, 10);
  p1.addAttack(20, 20, 82, 'kick', 'assets/char_kick.png',  30, 30, 20,4, 20, 50, -50);
  p1.addAttack(15, 25, 69, 'grab', 'assets/char_bills.png', 30, 10, -1,0, 25, 15);
  
  p2.addAttack(30, 30, 70, 'sword','assets/char_sword.png',10,  5,  1, 10, 10)
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