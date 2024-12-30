let x0 = 200;
let y0 = 20;

let x1 = 380;
let y1 = 380;

let x2 = 20;
let y2 = 380;

let X = [x0, x1, x2];
let Y = [y0, y1, y2];

let x_in;
let y_in;

let x_points = [];
let y_points = [];

function setup() {
  createCanvas(400, 400);

  noFill()
  stroke('lightblue')
  strokeWeight(2)

  x_in = random(0, width);
  y_in = random(0, height);

  while (!isInsideTriangle(x_in, y_in, x0, y0, x1, y1, x2, y2)) {
    x_in = random(0, width);
    y_in = random(0, height);
  }
}

function draw() {

  background(255);

  line(x0, y0, x1, y1);
  line(x1, y1, x2, y2);
  line(x2, y2, x0, y0);

  let vertex = floor(random(3))
  let x = X[vertex];
  let y = Y[vertex];

  stroke('pink');
  ellipse(x_in, y_in, 2, 2);

  x_in = (x + x_in) / 2;
  y_in = (y + y_in) / 2;

  stroke('gray')
  line(x, y, x_in, y_in);
  ellipse(x_in, y_in, 2, 2);

  x_points.push(x_in);
  y_points.push(y_in);

  stroke('lightblue');
  for (let i = 0; i < x_points.length; i++) {
    point(x_points[i], y_points[i]);
  }

  if (!mouseIsPressed) {

    noLoop();
  }

}

function triangleArea(x0, y0, x1, y1, x2, y2) {
  return abs((x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) / 2);
}

function isInsideTriangle(px, py, x0, y0, x1, y1, x2, y2) {

  let A = triangleArea(x0, y0, x1, y1, x2, y2);

  let A1 = triangleArea(px, py, x1, y1, x2, y2);
  let A2 = triangleArea(x0, y0, px, py, x2, y2);
  let A3 = triangleArea(x0, y0, x1, y1, px, py);

  return (A == A1 + A2 + A3);
}

function mousePressed(){
  loop()
}