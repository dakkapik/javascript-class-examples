class Input {
    constructor() {
        this.keyPressed = new Set();

        //create method for key assigment
        document.addEventListener("keydown", (e) => {
            this.keyPressed.add(e.keyCode)
            console.log(e.keyCode)
        })
        
        document.addEventListener("keyup", (e) => {
            this.keyPressed.delete(e.keyCode)
        })
    }

    drawCrossHair() {
        push()
        // Red cross
        strokeWeight(2);
        stroke(200, 0, 0);
        line(mouseX - 15, mouseY, mouseX + 15, mouseY);
        line(mouseX, mouseY - 15, mouseX, mouseY + 15);
        
        // Red dot
        noStroke();
        fill(200, 0, 0);
        ellipse(mouseX, mouseY, 10, 10);
        pop()
    }
}