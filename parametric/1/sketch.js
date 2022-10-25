var nPoints = 1000;
var displayRatio = 10;
var allX = [];
var allY = [];
var curveIndex = 0;

var grid = 3;

var noiseParam = 0;
var noiseStep = 0.001;

var x;
var y;

var a = 150;
var b = 10;
var h = 30;

var ph = 1.5;

var n = 12;

var rotation = 0;

var param1;
var param2;

var drawn = false;

var bgColor = '#F0F0F0'

function setup() {
  createCanvas(600, 600);
  frameRate(60);

  generateCurve();

  // noLoop();
}

function draw() {
  background('white');

  // draw the frame
  fill(0);
  noStroke();
  stroke(0);
  noFill();

  // draw the curve
  var counter = 0;
  push();
  translate(width/6, height/6);
  for (var i = 0; i < 3; i++){
    push();
    translate(i * width / 3, 0);
    for (var j = 0; j < 3; j++){
      push();
      translate(0, j * height / 3);
      rotate(PI/4);
      scale(0.75);
      drawCurveStatic(allX[counter], allY[counter]);
      pop();

      counter++;
    }
    pop();
  }
  pop();
  
}

function generateCurve(){
  var noiseParam = 0;
  for (var i = 0; i < 9; i++){
    var currentX = [];
    var currentY = [];
    while (curveIndex < nPoints * displayRatio){
      param1 = noise(noiseParam) * 10;
      param2 = noise(noiseParam + 1000) * 20;
      noiseParam += noiseStep;
      ph += rotation;
      var t = map(curveIndex, 0, nPoints, 0, TWO_PI);


      x = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
      y = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);
      currentX.push(x);
      currentY.push(y);
      curveIndex++;
    }
    allX.push(currentX);
    allY.push(currentY);
    noiseParam = 0;
    curveIndex = 0;
    noiseSeed(random(1000));
  }
}

function drawCurveStatic(xPoints, yPoints) {
  stroke('black');
  strokeWeight(1);
  for (var i = 0; i < xPoints.length - 1; i++) {
    line(xPoints[i], yPoints[i], xPoints[i + 1], yPoints[i + 1]);
  }

  noStroke();
  fill('red');
  ellipse(xPoints[xPoints.length - 1], yPoints[xPoints.length - 1], 1);
}


function drawCurve(xPoints, yPoints) {
  ph += rotation;

  param1 = noise(noiseParam) * 10;
  param2 = noise(noiseParam + 1000) * 20;
  noiseParam += noiseStep;

  // param = 6;

  curveIndex %= nPoints;
  var t = map(curveIndex, 0, nPoints, 0, TWO_PI);


  x = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
  y = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);
  xPoints.push(x);
  yPoints.push(y);

  // motion //
  if (xPoints.length >  nPoints * displayRatio) {
    xPoints.shift();
    yPoints.shift();
  }

  stroke('black');
  strokeWeight(1);
  for (var i = 0; i < xPoints.length - 1; i++) {
    line(xPoints[i], yPoints[i],xPoints[i + 1], yPoints[i + 1]);
  }

  noStroke();
  fill('red');
  ellipse(xPoints[xPoints.length - 1], yPoints[xPoints.length - 1], 1);

  curveIndex++;
}

function mousePressed(){
  background('white');
  generateCurve();
  drawn = false;
}