class Box {
    constructor(x, y, width, height, id) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = "white";
      this.collision = true;
    }
    
    setCollision (bool) {
      if(typeof(bool) === 'boolean'){
        this.collision = bool;
        return;
      }
      return new Error("collision must be boolean")
    }
    
    setColor(color) {
      this.color = color;
    }
    
    getCollision () {
      return this.collision;  
    }
    
    update() {
      this.draw();
    }
    
    draw() {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }
    
  }