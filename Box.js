class Box extends Entitie {
    constructor(x, y, width, height) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.jobSet.push("draw")
    }
    
    setColor(color) {
      this.color = color;
    }

    draw() {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }

    collisionWith(){}
}