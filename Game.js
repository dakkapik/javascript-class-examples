class Game {
  constructor () {
    this.gameWidth = 400;
    this.gameHeight = 400;
    this.floorY = 300;
    this.gravity = 0.5;
    this.keyPressed = new Set();
    this.entities = {};
    this.eId = [];
    
    document.addEventListener("keydown", (e) => {
      this.keyPressed.add(e.keyCode)
    })
    
    document.addEventListener("keyup", (e) => {
      this.keyPressed.delete(e.keyCode)
    })
  }
  
  addEntity (x, y, width, height) {
    let id = Date.now().toString();
    this.eId.push(id)
    this.entities[id] = new Box(x, y, width, height, id);
  }
  
  addPlayer (x, move) {
    let id = Date.now().toString();
    this.eId.push(id)
    this.entities[id] = new Player(id, x, move);
  }
  
  update() {
    this.eId.forEach(id => {
      // console.log(this.entities[id])
      this.collision(id)
      this.entities[id].update()
    })
  }
  
  collision (subjectId) {
    for(let target = 0; target < this.eId.length; target++){
      if(this.eId[target] !== subjectId) {
        let targetId = this.eId[target]
        if(
          
          this.entities[subjectId].x < this.entities[targetId].getRight() &&
          this.entities[subjectId].getRight() > this.entities[targetId].x &&
          this.entities[subjectId].y < this.entities[targetId].getDown() &&
          this.entities[subjectId].getDown() > this.entities[targetId].y
          
          
          ) {
            this.entities[subjectId].collision()
            this.entities[targetId].collision()
          
        }
      }
    }
  }
  
  drawFloor () {
    fill('white')
    rect(0, this.floorY, this.gameWidth, this.gameHeight - this.floorY)
  }
}




