class Entity {
    constructor () {
        this.id = this.genUniqueId();
        this.x = 0;
        this.y = 0;
        this.mass = 0;
        this.xForces = [];
        this.yForces = [];
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.xAccel = 0;
        this.yAccel = 0;
        this.width = 0;
        this.height = 0;
        this.color = "blue";
        this.jobSet = [];
        this.anchored = true;

        this.metaTextSize = 10;
        this.metaTextColor = 'black';
        this.metaDisplayList = [];
        this.metaDisplayDefault = new Set();
        this.metaDefaults = [];
    }

    update() {
        this.x = this.x + this.xVelocity;
        this.y = this.y + this.yVelocity;
        
        for(let i = 0; i < this.jobSet.length; i++){
            this[this.jobSet[i]]()
        };
    }   

    genUniqueId() {
        const dateStr = Date
          .now()
          .toString(36); // convert num to base 36 and stringify
      
        const randomStr = Math
          .random()
          .toString(36)
          .substring(2, 8); // start at index 2 to skip decimal point
      
        return `${dateStr}-${randomStr}`;
    }

    addJob(job) {
        this.jobSet.push(job)
    }

    removeJob(job){
        this.jobSet.splice(this.jobSet.indexOf(job))
    }

    calcXAccel () {
        let result = 0;
        this.xForces.forEach(force => result += force);
        this.xAccel = result;
    }

    calcYAccel () {
        let result = 0;
        this.yForces.forEach(force => result += force);
        this.yAccel = result;
    }

    updateXVelocity () {
        this.xVelocity += this.xAccel;
        this.xForces = [];

    }
    
    updateYVelocity () {
        this.yVelocity += this.yAccel;
        this.yForces = [];
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
    }

    gravity() {
        this.yForces.push(game.gravity)
    }

    hideMetaData() {
        this.removeJob("displayMetaData");
    }
        
    showMetaData( defaults ) {

        if(defaults) defaults.forEach(setting => this.metaDefaults.push(setting))

        textSize(this.metaTextSize);
        this.jobSet.splice(this.jobSet.indexOf('calcAccel'), 0, 'displayMetaData')

        const metaSidebar = document.createElement("div")
        metaSidebar.className = "metaSidebar"

        //not good, but i'll just keep it for now, there is a better way to do this
        let form = this.createMetaElementList()
        form = this.applyMetaDefaults(form)

        metaSidebar.appendChild(form)

        document.body.appendChild(metaSidebar)
    }

    applyMetaDefaults (form) {
        //save on session or something like that, cache?? maybe, different problem for different man
        this.metaDefaults.forEach(key => {
            
            form[key].checked = true;
            this.metaDisplayList.push(key)
        })
        return form; 
    }

    createMetaElementList () {
        const form = document.createElement("form");
        form.id = this.id;

        form.addEventListener("change", (e) => {
            if(document.getElementById(this.id)[e.target.id].checked) {
                this.metaDisplayList.push(e.target.id)
            } else {    
                this.metaDisplayList.splice(this.metaDisplayList.indexOf(e.target.id))
            }
        })

        Object.keys(this).forEach(property => {
            const input = document.createElement("input");
            const label = document.createElement("label");
            const br = document.createElement("br");

            input.type = "checkbox";
            input.id = property;
            input.name = property;
            input.value = property;

            label.for = property;
            label.innerHTML = property;

            form.appendChild(input);
            form.appendChild(label);
            form.appendChild(br);
        })
        return form;
    }


    displayMetaData() {
        let displayString = ''

        this.metaDisplayList.forEach(key => {
            if(typeof(this[key]) !== 'object') {
                displayString += `${key}: ${this[key]}`
            } else {
                displayString += this.formatMetaArrayToString(this[key], key)
            }
            displayString += '\n'
        })

        push();
        fill(this.metaTextColor);
        text(displayString, game.gameWidth - 150, this.metaTextSize);
        pop();
    }

    formatMetaArrayToString(array, name) {
        return `${name}: \n > ${JSON.stringify(array).replace(/,/g, '\n > ').replace(/{*}*\[*\]*/g, '')}`
    }
}