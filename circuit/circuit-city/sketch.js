let palette = ["#6824ab", "#2E0451", "#927671", "#A297AC", "#FBEE81"];
let directions = [];
let emptyNodes = [];
let colors = [];
let trues = [];

let rows;
let cols;
let spacing = 4;

let traceI = 0;
let traceJ = 0;

let tx = 0;
let ty = 0;

function setup() {
	createCanvas(600, 600);
	// createCanvas(800, 800);
	// noLoop();
	frameRate(400);
	rectMode(CENTER);
	angleMode(DEGREES);

	rows = floor(height / spacing);
	cols = floor(width / spacing);

	// populate directions
	for (let i = 0; i <= 8; i++){
		directions.push(i*45);
	}

	// populate emptyNodes
	for (let i = 0; i <= rows * cols; i++){
		trues.push(true);

	}

	for (let i = 0; i <= 1.5 * rows * cols; i++){
		colors.push(random(palette));

	}

	emptyNodes = [...trues];

	// print(emptyNodes)
}

let np = 0;
function draw() {
	background('white');
	noLoop();
	// tx += (noise(np) - 0.5)/5;
	// ty += noise(np + 1000)/10;

	for (let i = 0; i < 6; i++){

		if (i % 2 == 1) erase();
		else noErase();
		
		let seed = random(1000)
		noiseSeed(seed)
		Noise.seed(seed)
		np += 0.1

		traceI = 0;
		traceJ = 0;

		emptyNodes = [...trues];		
		while (traceI <= cols && traceJ <= rows){
			let nodeIndex = (traceJ * cols) + traceI;
			if (emptyNodes[nodeIndex]){
				traces(traceI, traceJ);
			}
			traceI++;
			if (traceI > cols && traceJ <= rows){
				traceI = 0;
				traceJ++;
			}
		}
	}
}

function grid() {
	let w = width / rows;
	for (let i = 0; i <= cols; i++) {
		for (let j = 0; j <= rows; j++) {
			let x = i * w;
			let y = j * w;
			let currColor = random(palette);
			noStroke();
			fill(currColor);
			rect(x, y, w * 0.3, w * 0.3);
		}
	}
}

function traces(i, j) {
	let w = width / rows;
	let x = i * w;
	let y = j * w;
	// if (colors[i * rows + j] == undefined) print(i * rows + j)
	// print(colors[i * rows + j]);
	let currColor = color(colors[i * rows + j]);
	if (currColor == undefined) currColor = palette[0];
	
	strokeWeight(1);
	stroke(0);
	noiseLine(x, y);
}

function noiseLine(x, y) {
	let px = x;
	let py = y;
	let numTraces = int(random(rows/10, rows));
	let ns = 0.0025;
	for (let i = 0; i < numTraces; i++) {
		let nodeIndex = ((y / spacing) * cols) + (x / spacing);
		// print(nodeIndex);
		emptyNodes[nodeIndex] = false;
		let angleIndex = int(noise(x * ns + tx, y * ns + ty, i * 0.0001) * 16) % 8;
		// let angleIndex = int(Noise.perlin3(x * ns + tx, y * ns + ty, i * 0.0001) * 16) % 8;
		let angle = directions[angleIndex];
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
		// while (!emptyNodes.includes([x / spacing, y / spacing])) {
		// 	angleIndex = int(noise(x * ns, y * ns, i * 0.0001) * 8);
		// 	angle = directions[angleIndex];
		// 	// print(angle);
		// 	px = x;
		// 	py = y;
		// 	if (angle % 90 == 0) {
		// 		x += cos(angle) * spacing;
		// 		y += sin(angle) * spacing;
		// 	} else { /** angle is 45, 135, ...  */
		// 		x += cos(angle) * spacing * sqrt(2);
		// 		y += sin(angle) * spacing * sqrt(2);
		// 	}
		// }
		
	}
}

// unused
function bg() {
	let c = 200;
	let w = width / c;
	noFill();
	stroke(180, 50);
	strokeWeight(0.5);
	for (let i = 0; i < c; i++) {
		for (let j = 0; j < c; j++) {
			let x = i * w;
			let y = j * w;
			rect(x, y, w, w);
		}
	}
}
