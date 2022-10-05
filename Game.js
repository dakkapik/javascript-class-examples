class Game {
    constructor () {
      this.gameWidth = 400;
      this.gameHeight = 400;
      this.floorY = 300;
      this.gravity = 0.5;
      this.keyPressed = new Set();
      
      document.addEventListener("keydown", (e) => {
        this.keyPressed.add(e.keyCode)
      })
      
      document.addEventListener("keyup", (e) => {
        this.keyPressed.delete(e.keyCode)
      })
    }
    
    drawFloor () {
      fill('white')
      rect(0, this.floorY, this.gameWidth, this.gameHeight - this.floorY)
    }
}
  