var nPoints = 100;

function setup() {
  createCanvas(400, 250);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  // background(255);
  noFill();

  concentricEllipses(width/2, height, 3, 0)
  concentricEllipses(3*width/4, height/2, 2, -45)
  concentricEllipses(50, 80, 4, 30)
}

function concentricEllipses(x, y, s, r) {
  push();
  translate(x, y);
  rotate(r);
  scale(s);

  strokeWeight(1/s)

  let maxr = 160
  let numEllipses = 12

  for (let i = 0; i < numEllipses; i+=1) {
    let rmaj = map(i, 0, numEllipses, 5, maxr);
    let rmin = map(i, 0, numEllipses, 2, maxr/2);

    ellipse(0, 0, rmaj, rmin);
  }

  pop();
}