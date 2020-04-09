class Person {


    constructor() {
        this.movement = new Movement(5000);
        this.pos = createVector(random(width - 60) + 30, random(height - 60) + 30);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);

        this.healthy = true;
        this.infected = false;
        this.removed = false;

        this.timeSinceInfected = 0;
        this.timeToRemove = Math.floor(Math.random() * (daysToRemoveU - daysToRemoveL) + daysToRemoveL) * 60;

        this.c = color(53, 126, 199);
    }



    show() {
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, 5, 5);

        if (this.infected) this.timeSinceInfected++;
        if (this.timeSinceInfected > this.timeToRemove) {
            if (!this.removed) {
                let index = infectedArray.findIndex(o => o == this);
                infectedArray.splice(index, 1);
            }

            this.infected = false;
            this.removed = true;
            this.c = color(75, 75, 75);
        }
    }

    move() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.checkCollision();

        if (this.movement.directions.length > this.movement.step) {
            this.acc = this.movement.directions[this.movement.step];
            this.movement.step++;
        }
    }

    checkCollision() {
        if (this.pos.x + 20 > width) {
            this.vel.x *= -1;
        }
        if (this.pos.x - 20 < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y + 20 > height) {
            this.vel.y *= -1;
        }
        if (this.pos.y - 20 < 0) {
            this.vel.y *= -1;
        }
    }


    findPasserbys(population) {
        for (let i = 0; i < population.length; i++) {
            let distance = dist(this.pos.x, this.pos.y, population[i].pos.x, population[i].pos.y);
            if (distance < infectionRadius) {
                let rand = random(1);
                if (rand < probabilityOfInfection) {
                    if (population[i].healthy && !socialDistancingOn) {
                        population[i].infected = true;
                        population[i].healthy = false;
                        population[i].c = color(255, 0, 0);
                        infectedArray.push(population[i]);
                        population[i].index = i;
                    }
                    if (this.infected && population[i].healthy) {
                        population[i].infected = true;
                        population[i].healthy = false;
                        population[i].c = color(255, 0, 0);
                    }
                    if (this.healthy && population[i].infected) {
                        this.infected = true;
                        this.healthy = false;
                        this.c = color(255, 0, 0);
                    }
                }
            }

            if (socialDistancingOn) {
                let force = p5.Vector.sub(this.pos, population[i].pos);
                let dSquared = force.magSq();
                dSquared = constrain(dSquared, 1, 50000000);
                force.setMag(1 / dSquared);
                force.mult(socialDistancingFactor);
                this.acc.add(force);
            }
        }
    }
}
