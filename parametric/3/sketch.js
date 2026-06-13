var nPoints = 10000;
var displayRatio = 1;
var allX = [];
var allY = [];
var curveIndex = 0;

var grid = 1;

var noiseParam = 0;
var noiseStep = 0.001;

var x;
var y;

var a = 150;
var b = 10;
var h = 10;

var ph = 1.5;

var n = 12;

var rotation = 0;

var param1;
var param2;

var drawn = false;

var bgColor = '#F0F0F0'

function setup() {
  createCanvas(816, 1056, SVG);
}

let doExport = false;
function draw() {

  background('white')
  text(mouseX + ', ' + mouseY, 10, 10)

  translate(width/2, 0);
  // rotate(radians(45));

  stroke('black');
  strokeWeight(1);
  drawCurve();

  if (doExport) {
    let svgFilename = "noisy-square-" + nPoints + ".svg"; 
    // saveSVG(svgFilename);
    doExport = false;
  }

  sweeping_value += 1;
  // noLoop();
}

function mousePressed() {
  loop();
}

function keyPressed() {
  if (keyCode = 's') doExport = true;
}


let s = 0.5;
let sweeping_value = 0;

function drawCurve() {

  noFill()
  beginShape();
  for (let i = 0; i < nPoints; i++){
    ph += rotation;

    let param1 = noise(noiseParam) * 10;
    let param2 = noise(noiseParam + 1000) * 20;
    noiseParam += noiseStep;

    let t = map(i, 0, 1000, 0, TWO_PI);


    // let x0 = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
    // let y0 = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);

    // let x0 = 60 * noise(0.01 * i) - 20 * cos(ph + (t * (a - b)) / b)
    // let y0 = 60 * noise(0.01 * i) - 20 * sin(ph + (t * (a + b)) / b)

    let x0 = (140 * sqrt(2) * cos(t/2)) / (sin(t/2)**2 + 1) * sin(i/sweeping_value)
    let y0 = (2 * 160 * sqrt(4) * cos(t/2) * sin(t/2)) / (sin(t/2)**2+1)

    param1 = noise(noiseParam) * 10;
    param2 = noise(noiseParam + 1000) * 20;
    noiseParam += noiseStep;

    t = map(i+1, 0, nPoints, 0, TWO_PI);


    let x1 = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
    let y1 = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);

  
    // line(s * x0, s * y0, s * x1, s * y1);
    vertex(2 * s * x0 + i / 50 * sin(t), s * y0 + i/8);

  }

  endShape();
  
}