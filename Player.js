class Player {
  constructor (id) {
    this.sprites = {
      idle: loadImage('assets/char_idle.png')
    }
    this.id = id;
    this.x = 150;
    this.y = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.grounded = false; 
    this.width = 40;
    this.height = 80;
    this.topSpeed = 8;
    this.jumpHeight = 10;
    this.attacking = false;
    
    this.color = "rgba(0,0,255,0.2)";
  
    this.attacks = {
      punch : new Attack(30,30,10),  
      kick: new Attack(30, 15, 10)
    }
    
    this.keys = {
      left: 65,
      right:68,
      jump:32,
      punch: 70,
      kick: 82
    }
  }
  
  update() {
  
    this.xVelocity = this.updateXVelocity()
    this.yVelocity = this.updateYVelocity()

    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    
    this.drawHitbox();
    this.draw();
    
    if(game.keyPressed.has(this.keys.punch)) {
      this.attacking = true;
      this.attacks.punch.draw(this.x + this.width, this.y);
    } else {
      this.attacking = false;
    }
    
    
    if(game.keyPressed.has(this.keys.kick)) {
      this.attacks.kick.draw(this.x + this.width, this.y);
    }
  }

  
  updateXVelocity () {
    if(game.keyPressed.has(this.keys.right)) return this.topSpeed;
    if(game.keyPressed.has(this.keys.left)) return -this.topSpeed;
    return 0;
  }
  
  updateYVelocity () {
    if(game.keyPressed.has(this.keys.jump) && this.grounded) {
      this.grounded = false;
      return -this.jumpHeight;
    }
    
    if(this.y + this.height < game.floorY) {
      this.grounded = false;
      return this.yVelocity + game.gravity;
    }
    
    this.grounded = true;
    return -(this.yVelocity / 2);
  }
  
  drawHitbox(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  draw(){
    image(this.sprites.idle)
    // if(this.attacking){
    //   image(this.sprites.attack, this.x,this.y)
    // }else {
    //   image(this.sprites.idle, this.x,this.y)
    // }
    
  }
}

class Attack {

  constructor(width, height, yOffSet = 0) {
    this.width = width;
    this.height = height;
    this.yOffSet = yOffSet;
  }
  
  draw(x, y) {
    fill('rgba(255,0,0,0.2)');
    rect(x, y + this.yOffSet, this.width, this.height);
  }
  
}
