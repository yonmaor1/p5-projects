let noiseX;
let noiseY;
let noiseParam = 0;
let noiseStep = 0.3;
let index = 0;

let col;
let target_col;

let capital_arr;
let capital = '';

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

  for (let i = 0; i < capital_arr.length; i++){
    capital += capital_arr[i];
  }

  textSize(40);
  fill('white');
  noStroke();

}

function draw() {

  background(0);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05) + noiseParam;
  createCrossSection(noiseParam);

  noiseParam += noiseStep;
  index += noiseStep;

}

function createCrossSection(noiseZ){

  for (let k = 0; k < 300; k++) {

      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.01, p * 0.005), 0, 1, -0.5*width, 1.5*width);
      let y = map(noise(noiseY, k * 0.01, p * 0.005), 0, 1, -0.5*height, 1.5*height);
      
      x = constrain(x, 10, width-50 - 10);
      y = constrain(y, 10, height-50 - 10);



      if (x < width/2) text(capital[floor(index) + k], x, y);
      else text('□', x, y)
    
  }
}