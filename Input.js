class Input {
    constructor() {
        this.keyPressed = new Set();
        
        document.addEventListener("keydown", (e) => {
            this.keyPressed.add(e.keyCode)
            // console.log(this.keyPressed)
        })
        
        document.addEventListener("keyup", (e) => {
            this.keyPressed.delete(e.keyCode)
        })
    }
}