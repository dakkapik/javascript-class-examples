class Game extends Input {
  constructor () {
    super();
    // this.background = loadImage("./assets/trees.jpg");
    this.background = loadImage("./assets/buildings.png");
    this.gameWidth = 600
    this.gameHeight = 400;
    this.gravity = 0.3;
    this.crosshair = true;
    this.keyPressed = new Set();
    this.entities = [];
  }
////////////////////////////////////
   //make function to add entites to game
/////////////////////////////////////
  addBox (x, y, width, height) {
    this.entities.push(new Box(x, y, width, height))
  }
  
  addPlayer (x, y, width, height) {
    this.entities.push(new Player(x, y, width, height))
  }
  
  update() {
    this.drawBackground();
    this.entities.forEach((entity, index) => {
      entity.update()
      this.collision(index)
    })
    this.drawCrossHair()
  }

  drawBackground(){
    //better background

    // image(this.background, 0,0,this.gameWidth, this.gameHeight)
    background(220);
  }

  
  collision (subject) {
    for(let target = subject + 1; target < this.entities.length; target++){
      if(
        this.entities[subject].getLeft() < this.entities[target].getRight() &&
        this.entities[subject].getRight() > this.entities[target].getLeft() &&
        this.entities[subject].getUp() < this.entities[target].getDown() &&
        this.entities[subject].getDown() > this.entities[target].getUp()
        ) {
          this.entities[subject].collisionWith(target)
          this.entities[target].collisionWith(subject)
      }
    }

  }
}




