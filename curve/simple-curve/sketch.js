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
}

function draw() {

  
  // background(0, 7);
  col = color(0, 0, 255 * noise(noiseParam));
  // print(col);

  // noFill();
  stroke('white');
  noFill();

  let noiseZ = /*map(mouseY, 0, height, 0, 1000 * 0.05) + */ noiseParam;
  createCrossSection(noiseZ);

  noiseParam += 30 * noiseStep;

  if (frameCount == 5) {
    noLoop();
  }

  // col = color(col);
  // target_col = color(target_col);
  // let dr = red(color(target_col)) - red(color(col));
  // let db = blue(color(target_col)) - blue(color(col));


}

function createCrossSection(noiseZ){

  // erase(0, 80);

  beginShape();
  for (let k = 0; k < 500; k++) {
    // let k = noiseZ
    
    // for (let p = 0; p < MAX; p++) {
      let p = noiseZ;

      let x0 = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y0 = map(noise(noiseY, k * 0.005, p * 0.013), 0, 1, -height * 0.75, height * 1.75);
      
      vertex(x0, y0);
    // }
    
  }
  endShape();
  
  // noErase();
}

function saveSvg(name) {
	let svgFilename = name + '-' + int(random(100)) + '.svg';
	saveSVG(svgFilename);
	return svgFilename;
}


function mousePressed() {
	let svgFilename = 'curves' + '.svg';
	save(svgFilename);

}