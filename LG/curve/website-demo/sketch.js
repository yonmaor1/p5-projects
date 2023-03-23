let noiseX;
let noiseY;
let MAX = 50;

let active = "home";

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(60);

  noiseX = random(1000);
  noiseY = random(1000);

  createCrossSection(0);

  print("with z: " + noise(noiseX, 1 * 0.005, 1 * 0.0111, 55));
  print("without z: " + noise(noiseX, 1 * 0.005, 1 * 0.0111, 0));
  // noLoop();
}

function draw() {
  background(0, 20);

  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05);
  createCrossSection(noiseZ);

  switch(active){
    case ("home"):

      break;

    case ("about"):
      break;

    case ("people"):
      break;

    case ("lines"):
      break;

    case ("livestream"):
      break;

  }

}

function createCrossSection(noiseZ){
  noFill();
  stroke('white');
  erase(0, 80);
  beginShape();
  for (let k = 0; k < 1000; k++) {

      let x = map(noise(noiseX, k * 0.005, noiseZ * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y = map(noise(noiseY, k * 0.005, noiseZ * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      vertex(x, y);
    
  }
  endShape();
  
  noErase();
}

function mousePressed(){
  background('white');
  noiseSeed(random(1000));
}