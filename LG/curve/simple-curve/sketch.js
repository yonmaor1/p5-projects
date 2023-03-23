let shapes = [];
let shapesNum = 10;
let pg;
const delta = 5000;

const palette = ["#E7E2AC", "#F5C220", "#05D5BA", "#EE039C", "#7D378B"];

let noiseX;
let noiseY;
let MAX = 50;

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
  // pg = createGraphics(width, height);
  // pg.angleMode(DEGREES);
  background(0, 20);

  // pg.noFill();
  let noiseZ = map(mouseY, 0, height, 0, 1000 * 0.05);
  createCrossSection(noiseZ);

  // pg.erase(0, 80);
  // // let MAX = 500;

  // for (let k = 0; k < 100; k++) {
  //   pg.beginShape();
  //   for (let p = 0; p < MAX; p++) {
  //     let x = map(noise(noiseX, k * 0.005, p * 0.0111, noiseZ), 0, 1, -width * 0.75, width * 1.75);
  //     let y = map(noise(noiseY, k * 0.005, p * 0.0113, noiseZ), 0, 1, -height * 0.75, height * 1.75);

  //     pg.vertex(x, y);
  //   }
  //   pg.endShape();
  // }

  // pg.noErase();

  // image(pg, 0, 0);

}

function createCrossSection(noiseZ){
  // pg.erase(0, 80);
  // let MAX = 500;
  noFill();
  stroke('white');
  erase(0, 80);
  beginShape();
  for (let k = 0; k < 1000; k++) {
    // let k = noiseZ
    
    // for (let p = 0; p < MAX; p++) {
      let p = noiseZ;

      let x = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width * 0.75, width * 1.75);
      let y = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height * 0.75, height * 1.75);
      
      vertex(x, y);
    // }
    
  }
  endShape();
  
  noErase();
}




function _setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  pg = createGraphics(width, height);
  pg.angleMode(DEGREES);
  pg.background(0);

  pg.noFill();

  pg.erase(0, 80);

  noiseX = pg.random(1000);
  noiseY = pg.random(1000);

  for (let k = 0; k < 100; k++) {
    pg.beginShape();
    for (let p = 0; p < MAX; p++) {
      let x = map(noise(noiseX, k * 0.005, p * 0.0111, 0), 0, 1, -pg.width * 0.75, pg.width * 1.75);
      let y = map(noise(noiseY, k * 0.005, p * 0.0113, 0), 0, 1, -pg.height * 0.75, pg.height * 1.75);

      pg.vertex(x, y);
    }
    pg.endShape();
  }

  pg.noErase();

  // noLoop();
}


function _draw() {
	
  // background(random(palette));

  // push();
  // drawingContext.filter = 'blur(30px)';

  // background(random(palette));
  // noFill();
  // for (let p = 0; p < 100; p++) {
  //   let num = floor(random(5, 10));
  //   strokeWeight(random(10, 50));
  //   stroke(random(palette));
  //   beginShape();
  //   for (let q = 0; q < num; q++) {
  //     curveVertex(random(width), random(height));
  //   }
  //   endShape();
  // }
  // pop();
	
  image(pg, 0, 0);
}