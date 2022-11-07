let game = new Game();
game.addEntity(0,300, 400, 50);

let player1
let player2

function setup() {
  player1 = new Player();
  player2 = new Player();
  
  frameRate(60);
  createCanvas(game.gameWidth, game.gameHeight);
  
  player2.x = 300;

}

function draw() {
  background(220);
  
  game.drawFloor();
  
  game.update();
  
  player1.update();
  player2.update();
}