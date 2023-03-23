var noiseParam = 0;
var noiseStep = 0.1;
var yStep = 1;

var allArrays = [];

function setup() {
    createCanvas(400, 400);
    for (var x = 0; x < width/5; x++){
        var tmp = [];
        for (var y = 0; y < height/5; y++){
            tmp.push(yStep*noise(noiseParam))
            noiseParam += noiseStep;
        }
        allArrays.push(tmp);
    }

    noLoop();
}

function draw() {
    for (var y = 0; y < allArrays.length; x++){
        curr = allArrays[y];
        for (var x = 0; x < allArrays[0].length - 1; x++){
            line(curr[x], x + y*noiseStep, curr[x+1], (x+1) + y*noiseStep);
        }
    }
}