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