let game = new Game();
game.addEntity(0,300, 400, 50);
// let player1
// let player2

function setup() {
  // player1 = new Player();
  // player2 = new Player();
  
  game.addPlayer(100, true);
  game.addPlayer(300, false);
  

  frameRate(60);
  createCanvas(game.gameWidth, game.gameHeight);
  
  // player2.x = 300;

  // player2.keys.left = 37;
  // player2.keys.right = 39;
  // player2.keys.jump = 17;
  // player2.keys.punch = 16;
}

function draw() {
  background(220);
  
  // game.drawFloor();
  
  game.update();
  
  // player1.update();
  // player2.update();
}