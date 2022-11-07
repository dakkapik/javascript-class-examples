class Game {
  constructor () {
    this.gameWidth = 400;
    this.gameHeight = 400;
    this.floorY = 300;
    this.gravity = 0.5;
    this.keyPressed = new Set();
    this.entities = {};
    
    document.addEventListener("keydown", (e) => {
      this.keyPressed.add(e.keyCode)
    })
    
    document.addEventListener("keyup", (e) => {
      this.keyPressed.delete(e.keyCode)
    })
  }
  
  addEntity (x, y, width, height) {
    let id = Date.now().toString();
    this.entities[id] = new Box(x, y, width, height, id);
  }
  
  addPlayer () {
    let id = Date.now().toString();
    this.entities[id] = new Player(id);
  }
  
  update() {
    Object.keys(this.entities).forEach((id)=> {
      this.entities[id].update()
    })
  }
  
  collision (id) {
     
  }
  
  drawFloor () {
    fill('white')
    rect(0, this.floorY, this.gameWidth, this.gameHeight - this.floorY)
  }
}




