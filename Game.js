class Game extends Input {
  constructor () {
    super();
    this.gameWidth = 400;
    this.gameHeight = 400;
    this.gravity = 0.3;
    this.keyPressed = new Set();
    this.entities = [];
    
    //create method for key assigment
    document.addEventListener("keydown", (e) => {
      this.keyPressed.add(e.keyCode)
    })
    
    document.addEventListener("keyup", (e) => {
      this.keyPressed.delete(e.keyCode)
    })
  }
  
  addBox (x, y, width, height) {
    this.entities.push(new Box(x, y, width, height))
  }
  
  addPlayer (x, y, width, height) {
    this.entities.push(new Player(x, y, width, height))
  }
  
  update() {
    this.entities.forEach((entity, index) => {
      entity.update()
      this.collision(index)
    })
  }
  
  collision (subject) {
    for(let target = subject + 1; target < this.entities.length; target++){
      if(
        this.entities[subject].x < this.entities[target].getRight() &&
        this.entities[subject].getRight() > this.entities[target].x &&
        this.entities[subject].y < this.entities[target].getDown() &&
        this.entities[subject].getDown() > this.entities[target].y
        ) {
          this.entities[subject].collisionWith(target)
          this.entities[target].collisionWith(subject)
      }
    }

  }
}




