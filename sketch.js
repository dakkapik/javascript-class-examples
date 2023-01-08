let game;

function setup() {
  frameRate(60);

  game = new Game();
  
  game.addPlayer(100, 10, 40, 80);
  game.addPlayer(300, 10, 40, 80);

  game.addBox(0,350, 900,50);
  game.addBox(0, 0, 10,350);
  game.addBox(590, 0, 10, 350);

  // console.log(game.entities);
  // console.log(game.entities[game.entityIds[1]]);

  // game.entities[game.entityIds[0]].showMetaData();
  game.entities[game.entityIds[0]].showHitbox();
  game.entities[game.entityIds[1]].showHitbox();
  // game.entities[game.entityIds[1]].showHitbox();

  game.entities[game.entityIds[1]].disableMove();

  
  createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  // console.log("frame")
  game.update();
}