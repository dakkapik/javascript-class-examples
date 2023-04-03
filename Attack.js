class Attack extends Entity {
    constructor(
      name, width, height, duration, 
      cooldown, xKnockback, yKnockback, damage, 
      yOffSet=0, xOffSet=0) {
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
    
    update(x, y, xOffSet, yOffSet) {
      /// how to do this????
      // 
      this.xOffSet = xOffSet;
      this.yOffSet = yOffSet;
      this.x = x;
      this.y = y;
    } 
  
  }
  