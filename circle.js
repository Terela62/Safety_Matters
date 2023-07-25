class Circle {
  constructor(x, y, r,color) {
    let options = {
     // angularSpeed:100
      sleepThreshold:60,
      //density:200,
      friction:0.8,
      //force:{ x: 0.1, y: 0.1},
    };    
    
    this.isOffscreen = function(){ 
      
      let pos = this.body.position;
      let speed = this.body.speed;
      //console.log(this.body.speed)
      return (pos.y<=50 && speed<=0);
    }
    this.body = Bodies.circle(x, y, r);
    this.r = r;
    this.color = color;
    Composite.add(world,this.body);

  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(0);
    stroke(255);
    fill(this.color);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}