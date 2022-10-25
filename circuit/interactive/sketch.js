var colors = ["#6824ab", "#2E0451", "#927671", "#A297AC", "#FBEE81"];
var directions = [];
var emptyNodes = [];

var rows;
var cols;
var spacing = 16;

var traceI = 0;
var traceJ = 0;

var reset = true;

function setup() {
	createCanvas(800, 800);
	// frameRate(400);
	rectMode(CENTER);
	angleMode(DEGREES);

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

	// print(emptyNodes)
}

function draw() {
	if (reset){
		background('black');
		// bg();
		grid();

		reset = false;
	}

	//if (mouseIsPressed){
		traceI = int(mouseX / spacing);
		traceJ = int(mouseY / spacing);

		let nodeIndex = (traceJ * cols) + traceI;
		//print(emptyNodes[nodeIndex]);
		if (emptyNodes[nodeIndex]){
			traces(traceI, traceJ);
		}
	//}
}

function grid() {
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
		print(angleIndex);
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

// unused
function bg() {
	var c = 200;
	var w = width / c;
	noFill();
	stroke(180, 50);
	strokeWeight(0.5);
	for (var i = 0; i < c; i++) {
		for (var j = 0; j < c; j++) {
			var x = i * w;
			var y = j * w;
			rect(x, y, w, w);
		}
	}
}

function keyPressed() {
	if (keyCode == RETURN){
		traceI = 0;
		traceJ = 0;

		// populate emptyNodes
		for (var i = 0; i <= rows * cols; i++){
			emptyNodes[i] = true;
		}

		noiseSeed(int(random(100)));

		reset = true;
	}
}

function mousePressed() {
	noiseSeed(random(100));

	reset = true;

	traceI = 0;
	traceJ = 0;

	// populate emptyNodes
	for (var i = 0; i <= rows * cols; i++){
		emptyNodes[i] = true;
	}
	
}
