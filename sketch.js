let game;

function setup() {
  frameRate(60);

  game = new Game();
  
  game.addBox(0,350, 900,50);

  game.addPlayer(100, 10, 40, 80);
  game.addPlayer(300, 10, 40, 80);

  console.log(game.entities);
  console.log(game.entities[game.entityIds[1]]);

  game.entities[game.entityIds[1]].showMetaData();
  game.entities[game.entityIds[1]].showHitbox();

  game.entities[game.entityIds[2]].disableMove();
  // game.entities[game.entityIds[2]].showHitbox();

  
  createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  // console.log("frame")
  game.update();
}