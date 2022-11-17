class Projectile extends Entity {
    constructor(x,y, user) {
        super();
        this.user = user
        this.color = "yellow";
        //change to have transparency
        this.hitBoxColor = "green"
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.bulletSpeed = 10;
        
        let xDiff = x - mouseX;
        let yDiff = y - mouseY;

        let abs = Math.abs(xDiff) + Math.abs(yDiff);

        this.xVelocity = - xDiff / abs * this.bulletSpeed;
        this.yVelocity = - yDiff / abs * this.bulletSpeed;
    } 

    borderCheck () {
        //destory better, stop updates on hit
        if(this.x > 0 && this.x < game.gameWidth && this.y > 0 && this.y < game.gameHeight ) return;
        console.log("wall collision");
        game.removeEntity(this.id);
    }

    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        this.borderCheck();

        // this.drawHitbox();
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

    collisionWith(entityIndex) {
        if(entityIndex !== this.user) game.removeEntity(this.id)
    }
}

function mousePressed() {

    // console.log(game.entities[game.entityIds[0]])
    const userId = game.entityIds[1]
   game.addEntity(new Projectile(game.entities[userId].getXCenter(), game.entities[userId].getYCenter(), userId));

}