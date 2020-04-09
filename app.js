let population = [];
let populationSize = 300;

let socialDistancingFactor = 10;
let infectionRadius = 5;
var probabilityOfInfection = 0.8;

var daysToRemoveU = 10;
var daysToRemoveL = 5;

var socialDistancingOn = false;

let totalHealthy = populationSize - 1;
let totalInfected = 1;
let totalRemoved = 0;

var infectedArray = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvas");
    frameRate(60);
    population = [];
    for (let i = 0; i < populationSize; i++) {
        population[i] = new Person();
    }
    population[53].infected = true;
    population[53].healthy = false;
    population[53].c = color(255, 0, 0);
    infectedArray.push(population[53]);
    population[53].index = 0;
}

function draw() {
    background(22);
    let h = 0;
    let ic = 0;
    let r = 0;

    for (let i = 0; i < population.length; i++) {
        population[i].show();
        population[i].move();
        if (socialDistancingOn) {
            population[i].findPasserbys(population);
        }

        if (population[i].healthy) h++
        else if (population[i].infected) ic++;
        else if (population[i].removed) r++;
    }

    if (!socialDistancingOn) {
        for (let j = 0; j < infectedArray.length; j++) {
            infectedArray[j].findPasserbys(population);
        }
    }

    totalHealthy = h;
    totalInfected = ic;
    totalRemoved = r;

    if (frameCount % 3 == 0) {
        Plotly.extendTraces('plot', { y: [[totalInfected]] }, [0]);
        Plotly.extendTraces('plot', { y: [[totalHealthy]] }, [1]);
        Plotly.extendTraces('plot', { y: [[totalRemoved]] }, [2]);
    }
    console.log(frameRate());
}

let layout = {
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(0, 0, 0, 0)",
    xaxis: { showgrid: false },
    yaxis: { showgrid: false }
};

$(document).ready(function () {
    Plotly.plot('plot', [
        {
            y: [totalInfected],
            name: "Infected",
            stackgroup: 'one',
            groupnorm: 'percent',
            fillcolor: '#F56756',
            line: {
                color: '#F56756'
            }
        },

        {
            y: [totalHealthy],
            name: "Healthy",
            stackgroup: 'one',
            fillcolor: '#30616B',
            line: {
                color: '#30616B'
            }
        },


        {
            y: [totalRemoved],
            name: "Removed",
            stackgroup: 'one',
            fillcolor: '#444444',
            line: {
                color: '#444444'
            }
        }
    ], layout);
});

