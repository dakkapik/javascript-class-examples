class Projectile extends Entity {
    constructor(x,y, id, user) {
        super();
        this.id = id;
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
        this.destroy();
    }

    destroy () {
        // change data structure, hash map countains all objects and a array contains all ids for collision testing
        game.entities.splice(this.id, 1);
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
        if(entityIndex !== this.user) this.destroy();
    }
}

function mousePressed() {
   
    game.entities.push(new Projectile(game.entities[1].getXCenter(), game.entities[1].getYCenter(), game.entities.length, 1))

}