let shapes = [];
let shapesNum = 10;
let pg;
const delta = 5000;

let noiseX;
let noiseY;
let MAX = 50;
let noiseParam = 0;
let noiseStep = 0.1;

let col;
let target_col;

let W = 10;

let capital_arr;
let capital = '';
let index = 0;

var nPoints = 1000;
var displayRatio = 10;
var allX = [];
var allY = [];
var curveIndex = 0;

var grid = 3;

var noiseParam_parametric = 0;
var noiseStep_param = 0.001

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

var colors = ["#6824ab", "#2E0451", "#927671", "#A297AC", "#FBEE81"];
var directions = [];
var emptyNodes = [];

var rows;
var cols;
var spacing = 16;

var traceI = 0;
var traceJ = 0;

var reset = true;

var walkParam = 0;
var walkStep = 0.1;

function preload() {
  capital_arr = loadStrings('capital.txt');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(60);

  noiseX = random(1000);
  noiseY = random(1000);

  createCrossSection(0);

  print("with z: " + noise(noiseX, 1 * 0.005, 1 * 0.0111, 55));
  print("without z: " + noise(noiseX, 1 * 0.005, 1 * 0.0111, 0));
  background(0);
  // noLoop();

  for (let i = 0; i < capital_arr.length; i++){
    capital += capital_arr[i];
  }

  textSize(40);
  fill('white');
  noStroke();

  generateCurve();

  rows = height / spacing;
	cols = width / spacing;

	// populate directions
	for (var i = 0; i <= 8; i++){
		directions.push(i*45);
	}

	// populate emptyNodes
	for (var i = 0; i <= rows * cols; i++){
		emptyNodes.push(true);
	}
}

function draw() {

  let n = 5;
  let time = 1200;
  
  if (floor(frameCount / time)%n == 0) simpleCurve();
  else if (floor(frameCount / time)%n == 1) pixelCurve();
  else if (floor(frameCount / time)%n == 2) eraserCurve();
  else if (floor(frameCount / time)%n == 3) circuit();
  else if (floor(frameCount / time)%n == 4) textCurve();

  noiseParam += noiseStep;

}

function textCurve() {
  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;
  createCrossSection_text(noiseParam);

  index += noiseStep;
}

function simpleCurve() {
  background(0, 5);
  col = color(0, 0, 255 * noise(noiseParam));
  // print(col);

  // noFill();
  stroke('blue');

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;
  createCrossSection(noiseZ);
}

function pixelCurve() {
  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;
  createCrossSection_pixel(noiseParam);
}

function eraserCurve(){
  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;

  stroke('white');
  noFill();
  // createCrossSection(noiseParam);
  draw_grid(width, height, W);
  removeCrossSection(noiseParam);
}

function removeCrossSection(noiseZ){

  // erase(0, 80);

  for (let k = 0; k < 1000; k++) {

      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      // x = constrain(x, 0, width);
      // y = constrain(y, 0, height);

      x = floor(x / W);
      y = floor(y / W);

      fill('black');
      stroke('black');
      rect(x * W, y * W, W);

      stroke('white');
      //draw_x(x * W, y * W, W-4);
    
  }
  
  // noErase();
}

function draw_grid(grid_width, grid_height, d) {
  noFill();
  stroke('white');
  for (let i = 0; i < (grid_width)/d; i++){
    for (let j = 0; j < (grid_height)/d; j++){
      rect(i * d, j * d, d - 4);
    }
  }
}

function draw_x(x, y, w){
  push();
  translate(x - w/2, y - w/2);
  line(0, 0, w, w);
  line(0, w, w, 0);
  pop();
}

function createCrossSection(noiseZ){

  erase(0, 80);

  beginShape();
  for (let k = 0; k < 1000; k++) {
    // let k = noiseZ
    
    // for (let p = 0; p < MAX; p++) {
      let p = noiseZ;

      let x0 = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y0 = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      vertex(x0, y0);
    // }
    
  }
  endShape();
  
  noErase();
}


function createCrossSection_pixel(noiseZ){

  erase(0, 80);

  for (let k = 0; k < 1000; k++) {

      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -0.5*width, 1.5*width);
      let y = map(noise(noiseY, k * 0.005, p * 0.011), 0, 1, -0.5*height, 1.5*height);
      
      let dx = x - mouseX;
      let dy = y - mouseY;

      x += dx / 5;
      y += dy / 5;

      x = constrain(x, 10, width-50 - 10);
      y = constrain(y, 10, height-50 - 10);

      

      rect(x, y, 50);
    
  }
  
  noErase();
}

function createCrossSection_text(noiseZ){

  for (let k = 0; k < 300; k++) {

      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.01, p * 0.005), 0, 1, -0.5*width, 1.5*width);
      let y = map(noise(noiseY, k * 0.01, p * 0.005), 0, 1, -0.5*height, 1.5*height);
      
      x = constrain(x, 10, width-50 - 10);
      y = constrain(y, 10, height-50 - 10);


      fill('white');
      noStroke();
      if (x < width/2) text(capital[floor(index) + k], x, y);
      else text('□', x, y)
    
  }
}

function parametric(){
  background('white');

  // draw the frame
  fill(0);
  noStroke();
  stroke(0);
  noFill();

  // draw the curve
  var counter = 0;
  push();
  translate(width/2, height/2);
  // for (var i = 0; i < 3; i++){
  //   push();
  //   translate(i * width / 3, 0);
  //   for (var j = 0; j < 3; j++){
  //     push();
  //     translate(0, j * height / 3);
        rotate(PI/4);
  //     scale(0.75);
      drawCurve(allX[counter], allY[counter]);
  //     pop();

  //     counter++;
  //   }
  //   pop();
  // }
  pop();
}

function generateCurve(){
  var noiseParam_parametric = 0;
  for (var i = 0; i < 1; i++){
    var currentX = [];
    var currentY = [];
    while (curveIndex < 0 * displayRatio){
      param1 = noise(noiseParam_parametric) * 10;
      param2 = noise(noiseParam_parametric + 1000) * 20;
      noiseParam_parametric += noiseStep_param;
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
    noiseParam_parametric = 0;
    curveIndex = 0;
    noiseSeed(random(1000));
  }
}

function drawCurve(xPoints, yPoints) {
  ph += rotation;

  param1 = noise(noiseParam_parametric) * 10;
  param2 = noise(noiseParam_parametric + 1000) * 20;
  noiseParam_parametric += noiseStep_param;

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


function circuit(){
  if (reset){
		background('black');
		// bg();
		grid_circuit();

		reset = false;
	}

	// walkValue = int(noise(walkParam) * (rows * cols))
	walkX = int(noise(walkParam) * cols)
	walkY = int(noise(walkParam + 1000) * rows)
	walkParam += walkStep;

	traceI = int(walkX * spacing);
	traceJ = int(walkY * spacing);
	// noFill();
	// stroke('red');
	// ellipse(traceI, traceJ, 10);

	let nodeIndex = (walkY * cols) + walkX;
	//print(emptyNodes[nodeIndex]);
	if (emptyNodes[nodeIndex]){
		traces(walkX, walkY);
	}

	if (frameCount % 1200 == 0){ 
		print('reset noise seed')
		noiseSeed(int(random(1000)));
	}
}

function grid_circuit() {
	var w = width / rows;
	for (var i = 0; i <= cols; i++) {
		for (var j = 0; j <= rows; j++) {
			var x = i * w;
			var y = j * w;
			var currColor = random(colors);
			noStroke();
			fill(currColor);
			rect(x, y, w * 0.3, w * 0.3);
		}
	}
}

function traces(i, j) {
	var w = width / rows;
	var x = i * w;
	var y = j * w;
	currColor = random(colors);
	strokeWeight(2);
	stroke(currColor);
	noiseLine(x, y);
}

function noiseLine(x, y) {
	var px = x;
	var py = y;
	var numTraces = int(random(rows/10, rows));
	var ns = 0.0025;
	for (var i = 0; i < numTraces; i++) {
		let nodeIndex = ((y / spacing) * cols) + (x / spacing);
		// print(nodeIndex);
		emptyNodes[nodeIndex] = false;
		var angleIndex = int(noise(x * ns, y * ns, i * 0.0001) * 16) % 8;
		// print(angleIndex);
		var angle = directions[angleIndex];
		px = x;
		py = y;
		if (angle % 90 == 0) {
			x += cos(angle) * spacing;
			y += sin(angle) * spacing;
		} else { /** angle is 45, 135, ...  */
			x += cos(angle) * spacing * sqrt(2);
			y += sin(angle) * spacing * sqrt(2);
		}
		line(x, y, px, py);
		
	}
}