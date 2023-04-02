class Player extends Entity{
  constructor (x, y, width, height, charName, idleSprite) {
    super();
    this.sprites = {
      idle: loadImage(`assets/${idleSprite}.png`)
    }

    this.charName = charName;

    this.maxHealth = 100;
    this.health;

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

    this.damaged = false;
    this.attacking = false;

    this.attackTimer = 0;
    this.attackDuration = 25; 

    this.currentAttack;
    
    this.attackCooldown = 30;

    this.movement = true;

    this.color = "rgba(0,0,255,0.2)";
  
    this.attacks = {}
    this.attackNames = [];

    this.attackEntitiIndex = null;

    this.keys = {};

    this.jobSet.push("draw")
    this.jobSet.push("gravity")
    this.jobSet.push("move")
  }

  addHealthBar (index) {
    this.health = new HealthBar(index, 20, this.charName, this.maxHealth)
  }

  addMoveKeys (keys){
    Object.entries(keys).forEach(([key, value]) => {
      this.keys[key] = value;
    })
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
  }

  disableMove(){
    Object.keys(this.keys).forEach( key => this.keys[key] = null)
  }

  move () {

    this.xVelocity = this.updateXVelocity();
    this.yVelocity = this.updateYVelocity();
    this.currentSprite = this.selectAnimation();

  }

  addAttack (attack, spritePath, keyCode)
    {

    this.sprites[attack.name] = loadImage(spritePath);

    this.attacks[attack.name] = new Attack(
      w, h, duration, 
      cooldown,xKnockback, yKnockback, 
      damage, yOffset, xOffset
      );

    this.keys[attack.name] = keyCode;
    this.attackNames = Object.keys(this.attacks);
  }

  selectAnimation() {
    if(this.attackTimer === 0) {
      this.attackNames.forEach(name => {
        if(game.keyPressed.has(this.keys[name])){
          this.currentAttack = name;
          
          this.attacking = true;
          this.attackTimer ++;
          this.attackDuration = this.attacks[name].duration;
          this.attackCooldown = this.attacks[name].cooldown;

          return this.sprites[this.currentAttack];
        }
      })
    }


      // needs work 
    if(this.attackTimer > 0 && this.attackTimer < this.attackCooldown + this.attackDuration){
      this.attackTimer ++;
      
      if(this.attackTimer < this.attackDuration) {
        return this.sprites[this.currentAttack]
      } else {
        this.attacking = false;
        return this.sprites.idle
      }
  
    } else {
      this.attackTimer = 0;
    }

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
    this.removeJob("displayMetaData");
  }

  showMetaData() {
    textSize(this.metaTextSize);
    this.jobSet.push("displayMetaData")
  }

  displayMetaData() {
    push();
    fill("blue")
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
    , game.gameWidth - 150, this.metaTextSize);
    pop();
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
    this.health.draw();
    this.attackLogic();
  }

  collisionWith(entitieIndex) {
    switch(game.entities[entitieIndex].constructor.name){
      case "Box":
        if(this.y < game.entities[entitieIndex].y && this.yVelocity > 0) {
          this.jumpCount = 0;
          this.yVelocity = 0;
          this.y = game.entities[entitieIndex].y - this.height;
          // this.xVelocity = game.entities[entitieIndex].xVelocity * -1;
          return; 
        }

        if(game.entities[entitieIndex].x < this.x){
          this.xVelocity = 5;
        } else {
          this.xVelocity = -5;
        }
        break;

      case "Attack" :

        let attack = game.entities[entitieIndex]  

        if(game.entities[entitieIndex].x < this.x){
          this.xVelocity = attack.xKnockback;
          this.yVelocity = -attack.yKnockback;
        } else {
          this.xVelocity = -attack.xKnockback;
          // this.yVelocity = attack.yKnockback;
        }

        if(!attack.hit) {
          this.health.reduce(attack.damage);
          attack.hit = true;
        }

        break;
      default :
        console.log("Player to:", game.entities[entitieIndex].constructor.name )
      break;
    }
    

  }

  drawHitbox(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    if(this.attacking){
      this.attacks[this.currentAttack].draw();
    }
  }

  attackLogic(){
    if(this.attacking){
      if(!this.attacks[this.currentAttack].active){
        this.attacks[this.currentAttack].activate();
      }

      if(this.faceRight) {
        this.attacks[this.currentAttack].update(this.x, this.y, this.width)
      } else {
        this.attacks[this.currentAttack].update(this.x, this.y, this.attacks[this.currentAttack].width*-1)
      }
      return 
    }

    if(this.currentAttack != null) {
      this.attacks[this.currentAttack].deactivate();
    }
  }
}

class Attack extends Entity {
  constructor(
    name, width, height, duration, 
    cooldown, xKnockback, yKnockback, damage, 
    yOffSet, xOffSet) {
      super();
    this.name = name;
    this.duration = duration;
    this.cooldown = cooldown;
    this.xKnockback = xKnockback;
    this.yKnockback = yKnockback;
    this.damage = damage;
    this.hit = false;
    this.active = false;
    this.width = width;
    this.height = height;
    this.yOffSet = yOffSet;
    this.xOffSet = xOffSet;
    
  }

  activate(){
    this.active = true;
    this.hit = false;
    game.addEntity(this);
  }
  
  deactivate(){
    if(this.active) {
      game.removeEntity(this.id);
      this.active = false;
      return
    } 
    return
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
    /// how to do this????
    // 
    this.xOffSet = xOffSet;
    this.yOffSet = yOffSet;
    this.x = x;
    this.y = y;
  } 

}
