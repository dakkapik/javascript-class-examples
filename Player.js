class Player extends Entitie{
  constructor (x, y, width, height) {
    super();
    this.sprites = {
      idle: loadImage('assets/char_idle.png'),
      attack: loadImage('assets/char_attack.png')
    }
    this.currentSprite = this.sprites.idle
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.metaTextSize = 20;

    this.runSpeed = 5;
    this.jumpHeight = 10;
    this.jumpCount = 0;
    this.jumpCooldown = false;
    this.jumpCooldownTime = 500;

    this.faceRight = true;

    this.grounded = false;

    this.attacking = false;
    this.attackDuration = 500;

    this.attackCooldownTime = 600;
    this.attackCooldown = false;

    this.movement = true;

    this.color = "rgba(0,0,255,0.2)";
  
    this.attacks = {
      punch : new Attack(30,30,10),  
      kick: new Attack(30, 15, 10)
    }

    this.attackEntitiIndex = null;

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
    this.currentSprite = this.selectAnimation();

  }

  selectAnimation() {
    if(!this.attackCooldown && game.keyPressed.has(this.keys.punch)) {
      this.attacking = true;
      this.attackCooldown = true;

      game.entities.push()
      let index = game.entities.length - 1

      setTimeout(()=>{

        this.attacking = false;  
        setTimeout(()=> this.attackCooldown = false, this.attackCooldownTime);

      }, this.attackDuration)

      return this.sprites.attack;
    }

    if(this.attacking) return this.sprites.attack
    return this.sprites.idle;
  }

  updateYVelocity() {
    if(
      !this.jumpCooldown &&
      game.keyPressed.has(this.keys.jump) &&
      this.jumpCount < 2
    ) {

      this.jumpCooldown = true
      this.jumpCount ++;

      setTimeout(()=>{
        this.jumpCooldown = false ;
      }, this.jumpCooldownTime)

      return -this.jumpHeight
    } 
    
    return this.yVelocity;
  }

  updateXVelocity() {
    if(game.keyPressed.has(this.keys.right)){
      this.faceRight = true;
      return this.runSpeed;
    } 
    if(game.keyPressed.has(this.keys.left)) {
      this.faceRight = false;
      return -this.runSpeed;
    }
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

  hideMetaData() {
    this.jobSet = this.jobset.filter(e => e === "displayData")
  }

  showMetaData() {
    textSize(this.metaTextSize);
    this.jobSet.push("displayMetaData")
  }

  displayMetaData() {
    text(`
    x: ${this.x}
    y:${this.y}
    xVel:${this.xVelocity}
    yVel:${this.yVelocity}
    jumpCount: ${this.jumpCount}
    jcoolDown: ${this.jumpCooldown}
    faceRight: ${this.faceRight}
    attacking: ${this.attacking}
    attackCooldown: ${this.attackCooldown}`
    , game.gameWidth - 150, this.metaTextSize)
  }

  draw(){
    if(this.faceRight){
      image(this.currentSprite, this.x, this.y)
    } else {
      push()
      scale(-1,1)
      image(this.currentSprite, - this.x - this.width, this.y)
      pop()
    }
  }

  collisionWith(entitieIndex) {

    if(this.y < game.entities[entitieIndex].y && this.yVelocity > 0) {
      this.jumpCount = 0;
      this.yVelocity = 0;
      this.y = game.entities[entitieIndex].y - this.height;
      return; 
    }

  }

  drawHitbox(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    if(this.attacking){
      if(this.faceRight) {
        this.attacks.punch.draw(this.x + this.width, this.y)
      } else {
        this.attacks.punch.draw(this.x - this.width, this.y)
      }
    }
  }
}

class Attack {

  constructor(width, height, yOffSet = 0) {
    this.x
    this.y
    this.width = width;
    this.height = height;
    this.yOffSet = yOffSet;
  }
  
  draw(x, y) {
    fill('rgba(255,0,0,0.2)');
    rect(x, y + this.yOffSet, this.width, this.height);
  }
  
  update(x, y) {
    this.x = x;
    this.y = y;
  } 

}
