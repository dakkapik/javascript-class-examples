class Player extends Entity{
  constructor (x, y, width, height) {
    super();
    this.sprites = {
      idle: loadImage('assets/char_idle.png'),
      attack: loadImage('assets/char_attack.png')
    }
    //timer class
    this.currentSprite = this.sprites.idle
    this.x = x;
    this.y = y;
    this.xCenterOffset = width / 2;
    this.yCenterOffset = height / 2;
    this.width = width;
    this.height = height;
    this.metaTextSize = 20;

    this.runDrag = 0.8;
    this.runSpeed = 6;

    this.jumpHeight = 10;
    this.jumpCount = 0;
    this.jumpCooldownTime = 30;
    this.jumpCooldownTimer = 0;

    this.faceRight = true;

    this.attacking = false;

    this.attackTimer = 0;
    this.attackDuration = 25; 
    
    this.attackCooldown = 30;

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

  enableMove(settings){
    //setting to keys
      this.keys = {
        left: 65,
        right:68,
        jump:32,
        punch: 86,
        kick: 82
      }
    // this.jobSet.push("move")
  }

  disableMove(){
    Object.keys(this.keys).forEach( key => this.keys[key] = null)
    // this.removeJob("move")
  }

  move () {

    this.xVelocity = this.updateXVelocity();
    this.yVelocity = this.updateYVelocity();
    this.currentSprite = this.selectAnimation();

  }

  selectAnimation() {
    if(this.attackTimer === 0 && game.keyPressed.has(this.keys.punch)) {

      this.attacking = true;
      this.attackTimer ++;

      return this.sprites.attack;
    }
      // needs work 
    if(this.attackTimer > 0 && this.attackTimer < this.attackCooldown + this.attackDuration){
      this.attackTimer ++;
      
      if(this.attackTimer < this.attackDuration) {
        return this.sprites.attack;
      } else {
        this.attacking = false;
        return this.sprites.idle
      }
  
    } else {
      this.attackTimer = 0;
    }

    // if(this.attacking) return this.sprites.attack

    return this.sprites.idle;
  }

  updateYVelocity() {
    if(
      game.keyPressed.has(this.keys.jump) &&
      this.jumpCooldownTimer === 0 &&
      this.jumpCount < 2
    ) {

      this.jumpCount ++;
      this.jumpCooldownTimer ++;
      return -this.jumpHeight;

    } else {

      if(this.jumpCooldownTimer > 0 && this.jumpCooldownTimer < this.jumpCooldownTime) {
        this.jumpCooldownTimer++
      } else {
        this.jumpCooldownTimer = 0;
      }

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

    return this.xVelocity * this.runDrag
  }

  getXCenter() { return this.x + this.xCenterOffset }

  getYCenter() { return this.y + this.yCenterOffset }

  setSprite(sprite) {
    this.currentSprite = loadImage(sprite)
  }

  hideHitbox() {
    this.removeJob("drawHitBox");
  }

  showHitbox () {
    this.jobSet.push("drawHitbox");
  }

  hideMetaData() {
    this.removeJob("displayData");
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
    jumpColdown: ${this.jumpCooldownTimer}
    faceRight: ${this.faceRight}
    attacking: ${this.attacking}
    attackTimer: ${this.attackTimer}`
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
    this.attackLogic(this.showHitbox);
  }

  collisionWith(entitieIndex) {
    switch(game.entities[entitieIndex].constructor.name){
      case "Box":
        if(this.y < game.entities[entitieIndex].y && this.yVelocity > 0) {
          this.jumpCount = 0;
          this.yVelocity = 0;
          this.y = game.entities[entitieIndex].y - this.height;
          return; 
        }
      case "Attack" :
        if(game.entities[entitieIndex].x < this.x){
          this.xVelocity = 5;
        } else {
          this.xVelocity = -5;
        }
        // setTimeout(()=> this.xVelocity = 0, 50)
      default :
        console.log("Player to:", game.entities[entitieIndex].constructor.name )
    }
    

  }

  drawHitbox(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    if(this.attacking){
      this.attacks.punch.draw();
    }
  }

  attackLogic(){
    if(this.attacking){
      this.attacks.punch.activate();
      if(this.faceRight) {
        this.attacks.punch.update(this.x, this.y, this.width)
      } else {
        this.attacks.punch.update(this.x, this.y, this.attacks.punch.width*-1)
      }
      return 
    }
    this.attacks.punch.deactivate();
  }
}

class Attack extends Entity {
  constructor(width, height, yOffSet = 0, xOffSet) {
    super();
    this.index;
    this.active = false;
    this.width = width;
    this.height = height;
    this.yOffSet = yOffSet;
    this.xOffSet = xOffSet;

    /*
      FEATURES to add

      damage model
      knowback model
      cooldown
      time
    */
    
  }

  activate(){
    game.entities.push(this);
    this.index = game.entities.length;
    this.active = true;
    return
  }
  
  deactivate(){
    if(this.active) {
      game.entities.splice(this.index, 1);
      this.active = false;
      return;
    } 
    return;
  }

  draw() {
    fill('rgba(255,0,0,0.2)');
    rect(this.x + this.xOffSet, this.y + this.yOffSet, this.width, this.height);
  }

  getUp() {
    return this.y + this.yOffSet;
  }

  getLeft() {
    return this.x + this.xOffSet;
  }

  getDown() {
    return this.y + this.yOffSet + this.height;
  }

  getRight() {
    return this.x + this.xOffSet + this.width;
  }
  
  update(x, y, xOffSet) {
    this.xOffSet = xOffSet;
    this.x = x;
    this.y = y;
  } 

}
