class Entity {
    constructor () {
        this.id = Date.now().toString();
        this.x = 0;
        this.y = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.width = 0;
        this.height = 0;
        this.color = "blue";
        this.jobSet = [];
        this.anchored = true;
    }

    update() {
        this.x = this.x + this.xVelocity;
        this.y = this.y + this.yVelocity;
        
        for(let i = 0; i < this.jobSet.length; i++){
            this[this.jobSet[i]]()
        };
    }

    removeJob(job){
        this.jobSet.splice(this.jobSet.indexOf(job))
    }

    updateXVelocity (vel) {
        this.xVelocity = vel;
    }
    
    updateYVelocity (vel) {
        this.yVelocity = vel
    }

    getUp() {
        return this.y;
    }

    getLeft() {
        return this.x;
    }

    getRight(){
        return this.x + this.width;
    }

    getDown() {
        return this.y + this.height;
    }

    anchor() {
        this.anchored = true
        this.jobSet = this.jobset.filter(e => e === "gravity")
    }
  
    unanchor () {
        this.anchored = false
        this.jobSet.push("gravity")
    }

    drawHitbox() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }

    collisionWith(entityIndex) {
        // console.log(game.entities[entityIndex].constructor.name)
        // game.entities[entityIndex].yVelocity *= -1
        // this.yVelocity *= -1

        // if(game.entities[entityIndex].y > this.y){
        //     game.entities[entityIndex].yVelocity *= -1 
        // } else {

        // }

        // if(!this.anchored){
        //     // this.xVelocity += (this.xVelocity - game.entities[entityIndex].xVelocity) * -1
        //     this.yVelocity += (this.yVelocity - game.entities[entityIndex].yVelocity) * -1
        // }
    }

    gravity() {
        this.yVelocity += game.gravity;
    }
}