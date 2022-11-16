let game;

function setup() {
  game = new Game();
  
  game.addBox(0,350, 900,50);

  game.addPlayer(100, 10, 40, 80);
  game.addPlayer(300, 10, 40, 80);


  game.entities[1].showMetaData();
  game.entities[1].showHitbox();

  game.entities[2].disableMove();
  // game.entities[2].showHitbox();

  frameRate(60);
  createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  game.update();
}