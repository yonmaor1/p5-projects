let nPoints = 10000;
let displayRatio = 1;
let curveX = [];
let curveY = [];
let curveIndex = 0;

let grid = 1;

let noiseParam = 0;
let noiseStep = 0.003;

let x;
let y;

let a = 150;
let b = 10;
let h = 30;

let ph = 1.5;

let n = 12;

let rotation = 0;

let param1;
let param2;

let drawn = false;
let start = 0;

let bgColor = '#F0F0F0'

function setup() {
  createCanvas(1056, 816, SVG);
  makeCurve();
  // frameRate(10);
}

let doExport = false;
function draw() {

  background('white');

  translate(width/2, height/2);
  rotate(radians(45));

  stroke('black');
  strokeWeight(1);
  drawCurve();

  if (doExport) {
    let svgFilename = "noisy-square-" + floor(random(1000)) + ".svg"; 
    saveSVG(svgFilename);
    doExport = false;
  }

  // noLoop();
}

function mousePressed() {
  loop();
}

function keyPressed() {
  if (keyCode == 's') doExport = true;
}


let s = 2;

function drawCurve() {
  beginShape();
  for (let i = 0; i < curveX.length; i++) {
    vertex(curveX[i], curveY[i]);
  }
  endShape();

  curveX.shift()
  curveY.shift();

  curveX.push()
}

function makeCurve() {

  for (let i = 0; i < nPoints; i++){
    ph += rotation;

    let param1 = noise(noiseStep * i) * 10;
    let param2 = noise(noiseStep * (i + 1000)) * 20;
    // noiseParam += noiseStep;

    let t = map(i, 0, nPoints, 0, TWO_PI);


    let x0 = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
    let y0 = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);

    curveX.push(s * x0);
    curveY.push(s * y0);
  
    // line(s * x0, s * y0, s * x1, s * y1);
    //vertex(s * x0, s * y0);

  }
  
}
