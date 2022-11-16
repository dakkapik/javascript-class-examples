class Player extends Entitie{
  constructor (x, y, width, height) {
    super();
    this.sprites = {
      idle: 'assets/char_idle.png',
      attack: 'assets/char_attack.png'
    }
    this.currentSprite = loadImage(this.sprites.idle)
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.runSpeed = 5;
    this.jumpHeight = 10;

    this.grounded = false; 
    this.attacking = false;
    this.movement = true;

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

    this.jobSet.push("draw")
    this.jobSet.push("gravity")
    this.jobSet.push("move")
  }

  move () {
    this.xVelocity = this.updateXVelocity();
    this.yVelocity = this.updateYVelocity();
  }

  updateYVelocity() {
    if(game.keyPressed.has(this.keys.jump)) return this.jumpHeight
    return this.yVelocity;
  }

  updateXVelocity() {
    if(game.keyPressed.has(this.keys.right)) return this.runSpeed;
    if(game.keyPressed.has(this.keys.left)) return -this.runSpeed;
    return 0;
  }

  setSprite(sprite) {
    this.currentSprite = loadImage(sprite)
  }

  hideHitbox() {
    this.jobSet = this.jobset.filter(e => e === "drawHitbox")
  }

  showHitbox () {
    this.jobSet.push("drawHitbox")
  }

  draw(){
    image(this.currentSprite, this.x, this.y)
  }

  drawHitbox(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
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
