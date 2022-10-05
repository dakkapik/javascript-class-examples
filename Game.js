class Player {
    constructor () {
      this.x = 100;
      this.y = 0;
      this.xVelocity = 0;
      this.yVelocity = 0;
      this.grounded = false; 
      this.width = 20;
      this.height = 40;
      this.runAccel = 5;
      this.jumpHeight = 10;
      this.attack = new Attack(20,10)
      this.keys = {
        left: 65,
        right:68,
        jump:32,
        attack: 70
      }
    }
    
    update() {
    
      this.xVelocity = this.updateXVelocity()
      this.yVelocity = this.updateYVelocity()
  
      this.x += this.xVelocity;
      this.y += this.yVelocity;
      this.draw();
      if(game.keyPressed.has(this.keys.attack)) {
        this.attack.draw(this.x + this.width, this.y);
      }
    }
    
    updateXVelocity () {
      if(game.keyPressed.has(this.keys.right)) return this.runAccel
      if(game.keyPressed.has(this.keys.left)) return -this.runAccel
      return 0;
    }
    
    updateYVelocity () {
      if(game.keyPressed.has(this.keys.jump) && this.grounded) {
        this.grounded = false;
        return -this.jumpHeight;
      }
      
      if(this.y + this.height < game.floorY) {
        this.grounded = false;
        return this.yVelocity + game.gravity
      }
      
      this.grounded = true;
      return -(this.yVelocity / 2)
    }
    
    draw(){
      fill('blue')
      rect(this.x, this.y, this.width, this.height)
    }
  }
  
  class Attack {
  
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    
    draw(x, y) {
      fill('red')
      rect(x, y, this.width, this.height)
    }
    
}
  