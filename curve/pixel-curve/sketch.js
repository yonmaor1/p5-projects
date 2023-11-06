let noiseX;
let noiseY;
let noiseParam = 0;
let noiseStep = 0.3;

let col;
let target_col;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(60);

  noiseX = random(1000);
  noiseY = random(1000);

  createCrossSection(0);

}

function draw() {

  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;
  createCrossSection(noiseParam);

  noiseParam += noiseStep;

}

function createCrossSection(noiseZ){

  erase(0, 80);

  for (let k = 0; k < 1000; k++) {

      let p = noiseZ;

      let x0 = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y0 = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      x0 = constrain(x0, 0, width-50);
      y0 = constrain(y0, 0, height-50);

      rect(x0, y0, 50);
    
  }
  
  noErase();
}