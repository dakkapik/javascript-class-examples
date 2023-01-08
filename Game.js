class Game extends Input {
  constructor () {
    super();
    // this.background = loadImage("./assets/trees.jpg");
    // this.background = loadImage("./assets/buildings.png");
    this.gameWidth = 600
    this.gameHeight = 400;
    this.gravity = 0.3;
    this.crosshair = true;
    this.keyPressed = new Set();
    this.entities = {};
    this.entityIds = [];
  }

  addEntity ( entity ) {
    this.entities[entity.id] = entity;
    this.entityIds.push(entity.id);
  }

  removeEntity ( id ) {

    ///////////////////////
    // find way to delete obj without crash
    ////////////
    
    this.entityIds.splice(this.entityIds.indexOf(id), 1);
    console.log(this.entityIds.length)
    delete this.entities[id];
  }

  addBox (x, y, width, height) {
    this.addEntity(new Box(x, y, width, height))
  }
  
  addPlayer (x, y, width, height) {
    this.addEntity(new Player(x, y, width, height))
  }
  
  update() {

    this.drawBackground();
    this.entityIds.forEach((id, index) => {
      this.entities[id].update();
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
    for(let target = subject + 1; target < this.entityIds.length; target++){
       
      let t = this.entityIds[target];
      let s = this.entityIds[subject];

      // console.log(this.entities[this.entityIds[target]])
      if(
        this.entities[s].getLeft() < this.entities[t].getRight() &&
        this.entities[s].getRight() > this.entities[t].getLeft() &&
        this.entities[s].getUp() < this.entities[t].getDown() &&
        this.entities[s].getDown() > this.entities[t].getUp()
        ) {
          this.entities[s].collisionWith(t);
          this.entities[t].collisionWith(s);
      }
    }

  }
}




