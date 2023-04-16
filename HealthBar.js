class HealthBar {
  constructor(index, y, name, maxHealth) {

    let tenthOfGame = game.gameWidth / 10;
    this.width = game.gameWidth / 2 - tenthOfGame;

    this.name = name;
    this.y = y;

    if(index % 2 !== 0){
      this.x = tenthOfGame;
    } else {
      this.x = this.width + tenthOfGame
    }
    
    this.health = maxHealth;
    this.healthRatio = this.width / maxHealth; 
        
    this.nameDisplay = `${this.name} \ ${this.health}`;
    
    this.height = 20;
    
    this.bgColor = "grey";
    this.hpColor = "green";
    this.fontColor = "white";
  }
  
  draw() {
    push();
    fill(this.bgColor);
    rect(this.x, this.y, this.width, this.height);
    fill(this.hpColor);
    rect(this.x, this.y, this.health * this.healthRatio, this.height);
    fill(this.fontColor);
    text(this.nameDisplay, this.x, this.y + this.height);
    pop();
  }

  reduce(value){
    if(this.health - value > 0){
      this.health -= value;
    } else {
      this.health = 0;
      console.log("death")
    }
    this.nameDisplay = `${this.name} \ ${this.health}`;
  }
  
  increase(value){
    this.health += value;
    this.nameDisplay = `${this.name} \ ${this.health}`;
  }
}