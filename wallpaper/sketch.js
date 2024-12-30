function setup() {
  createCanvas(400, 400);
  background(220);
  angleMode(DEGREES);
}

function draw() {
  pattern(width/2, height/2);

  // noStroke();
  // fill('pink')
  triangle(0, 0, 0, 100, 100, 0);
}

function pattern(x, y) {
  swirl(x, y);
}

function swirl(x, y) {
  noFill();
  push()
  translate(x, y);

  let angle = 180;
  let radius = 10;
  let line_length = 1.5*radius;
  let x_dist = 0;
  let y_dist = 0;

  arc(0, 0, 2*radius, 2*radius, -45, -135);
  line(radius * cos(-45), radius * sin(-45), radius * cos(-45) - line_length, radius * sin(-45) - line_length);
}