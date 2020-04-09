class Movement {
    constructor(amount) {
      this.directions = [];
      this.randomize(amount);
      this.step = 0;
    }
  
    randomize(amount) {
      let firstAngle = random(2 * PI);
      let angle = firstAngle;
      for (let j = 0; j < amount; j++) {
        this.directions[j] = createVector(0, 0);
      }
      for (let i = 0; i < this.directions.length; i+= 5) {
        angle += 0.01;
        if (i % 40 == 0) {
          angle += random(2 * PI);
        }
        this.directions[i] = p5.Vector.fromAngle(angle);
        this.directions[i].mult(random(0.1));
      }
    }
  }