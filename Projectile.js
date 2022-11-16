class Projectile extends Entity {
    constructor(x,y) {
        super();
        this.color = "yellow";
        //change to have transparency
        this.hitBoxColor = "green"
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;

        let abs = Math.abs(x) + Math.abs(y)

        

        this.xVelocity = x
    } 

    update() {
        this.draw();
    }

    draw(){
        fill(this.color);
        ellipse(this.x, this.y, this.width)
    }

    drawHitbox () {
        fill(this.hitBoxColor);
        rect(this.x, this.y, this.width, this.height);
    }
}

function mousePressed() {
    console.log("mousedown")
}