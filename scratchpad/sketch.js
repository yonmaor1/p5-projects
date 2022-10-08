var nPoints = 100;
let mic;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background(255);

  // draw the frame
  fill(0);
  noStroke();
  stroke(0);
  noFill();

  // draw the curve
  push();
  translate(width / 2, height / 2);
  drawCurve();
  pop();
}

var ph = 0;

function drawCurve() {
  micLevel = mic.getLevel();
  let r = map(micLevel, 0, 1, 0, 25);
  print(r);

  var x;
  var y;

  var a = 150;
  var b = 10;
  var h = 30;

  ph += 0.7;
  
  var n = 12;

  for (var j = 1; j < n; j++) {
    var c = map(j, 0, n, 0, 255);
    stroke(0, 255 - c, 255 - c);
    beginShape();
    for (var i = 0; i < nPoints; i++) {
      var t = map(i, 0, nPoints, 0, TWO_PI);

      x = (j / n) * (a - b) * cos(t) + (j / n) * h * cos(ph + (t * (a - b)) / b);
      y = (j / n) * (a - b) * sin(t) - (j / n) * h * sin(ph + (t * (a + b)) / b);
      vertex(x + random(-r, r), y + random(-r, r));
    }
    endShape(CLOSE);
  }
}
