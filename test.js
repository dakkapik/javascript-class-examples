let game

function setup() {
    game = new Game();

    // game.addBox(0, 300, 300,50);
    game.addBox(0,600, 1000,50);

    game.addPlayer(100, 10, 40, 80);

    // game.entities[2].showHitbox();
    // game.entities[1].unanchor();
    game.entities[1].showMetaData();
    game.entities[1].showHitbox();

    frameRate(60);
    createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  background(220);

  game.update();
}