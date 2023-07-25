class Boundary {
  constructor(x, y, w, h) {
    let options = {
      friction: 0,
      //restitution: 0.9,
      isStatic: true,
//      angle: PI / 4
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Composite.add(world, this.body);
  }
  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    noStroke();
    fill('#FFFFFF');
    rect(0, 0, this.w, this.h);
    pop();
  }
}