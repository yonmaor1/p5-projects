let noiseX;
let noiseY;
let noiseParam = 0;
let noiseStep = 0.1;

let W = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  frameRate(60);

  noiseX = random(1000);
  noiseY = random(1000);

  createCrossSection(0);

}

function draw() {

  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;

  stroke('white');
  noFill();
  // createCrossSection(noiseParam);
  draw_grid(width, height, W);
  removeCrossSection(noiseParam);
  

  noiseParam += noiseStep;

}

function createCrossSection(noiseZ){

  // erase(0, 80);
  noFill();
  stroke('red');

  for (let k = 0; k < 1000; k+=5) {

      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      // x = constrain(x, 0, width);
      // y = constrain(y, 0, height);

      ellipse(x, y, 50);
    
  }
  
  // noErase();
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
      draw_x(x * W, y * W, W-4);
    
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