let game

function setup() {
    game = new Game();

    game.addBox(0, 300, 400,50);
    // game.addBox(10,10,50,50);

    game.addPlayer(100, 10, 40, 80);

    // game.entities[2].showHitbox();
    game.entities[1].unanchor();

    frameRate(60);
    createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  background(220);

  game.update();
}