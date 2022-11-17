let game

function setup() {
    game = new Game();

    // game.addBox(0, 300, 300,50);
    game.addBox(0,600, 1000,50);

    game.addPlayer(100, 10, 40, 80);
    game.addPlayer(300, 10, 40, 80);

    console.log(game.entities)
    console.log(game.entityIds)

    // game.entities[game.entityIds[1]].showMetaData();
    // game.entities[game.entityIds[1]].showHitbox();

    // game.entities[game.entityIds[2]].disableMove();
    // game.entities[game.entityIds[2]].showHitbox();

    frameRate(60);
    createCanvas(game.gameWidth, game.gameHeight);
}

function draw() {
  game.update();
}