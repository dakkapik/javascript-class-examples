let game;
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

function setup() {
  frameRate(60);

  game = new Game();
  
  game.addPlayer(100, 10, 40, 80, "Aurelian");
  game.addPlayer(300, 10, 40, 80, "Guideon");

  game.addBox(0,350, 900,50);
  game.addBox(0, 0, 10,350);
  game.addBox(590, 0, 10, 350);

  game.entities[game.entityIds[0]].addMoveKeys(keysP1);

  /*
   addAttack command order => 
   width, height, keyCode, name, spritePath, duration, cooldown, knockback, damage, yOffset, xOffset
  */
  game.entities[game.entityIds[0]].addAttack(30, 30, 70, 'sword','assets/char_sword.png',10,  5,  1, 10, 10);
  game.entities[game.entityIds[0]].addAttack(20, 20, 82, 'kick', 'assets/char_kick.png',  30, 30, 20, 20, 50, -50);
  game.entities[game.entityIds[0]].addAttack(15, 25, 69, 'grab', 'assets/char_bills.png', 30, 10, -1, 25, 15);

  game.entities[game.entityIds[1]].addMoveKeys(keysP2);

  game.entities[game.entityIds[0]].showHitbox();
  game.entities[game.entityIds[1]].showHitbox();
  // game.entities[game.entityIds[1]].showHitbox();

  // game.entities[game.entityIds[1]].disableMove();

  
  createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  // console.log("frame")
  game.update();
}